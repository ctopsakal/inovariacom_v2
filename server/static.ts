import express, { type Express, type Request } from "express";
import fs from "fs";
import path from "path";
import type { BlogPost } from "@shared/schema";
import { storage } from "./storage";
import {
  ADMIN_HEAD,
  NOT_FOUND_HEAD,
  blogListHead,
  blogPostHead,
  inlineJson,
  renderHead,
  type PageHead,
} from "./seo";

type Prefetched = { queryKey: unknown[]; data: unknown }[];
type SsrModule = { render(url: string, prefetched: Prefetched): { html: string; state: unknown } };

const HEAD_BLOCK = /<!--page-head:start[\s\S]*?<!--page-head:end-->\n?/;

// Same shape the API returns, so the browser can reuse it as query data.
const asJson = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

type Page = { status: number; head?: PageHead; prefetched: Prefetched };

/** Decides status, head tags and the data a route needs, mirroring the routes in client/src/App.tsx. */
async function resolvePage(req: Request): Promise<Page> {
  const pathname = req.path.replace(/\/+$/, "") || "/";
  if (pathname === "/") return { status: 200, prefetched: [] };
  if (pathname === "/admin") return { status: 200, head: ADMIN_HEAD, prefetched: [] };
  if (pathname === "/blog") {
    const posts: BlogPost[] = await storage.getBlogPosts();
    return {
      status: 200,
      head: blogListHead(posts),
      prefetched: [{ queryKey: ["/api/blog"], data: asJson({ success: true, posts }) }],
    };
  }
  const match = /^\/blog\/([^/]+)$/.exec(pathname);
  if (match) {
    const slug = decodeURIComponent(match[1]);
    const post = await storage.getBlogPostBySlug(slug);
    if (post?.published) {
      return {
        status: 200,
        head: blogPostHead(post),
        prefetched: [{ queryKey: ["/api/blog", slug], data: asJson({ success: true, post }) }],
      };
    }
  }
  return { status: 404, head: NOT_FOUND_HEAD, prefetched: [] };
}

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const template = fs.readFileSync(path.resolve(distPath, "index.html"), "utf-8");

  // Built by script/build.ts. Without it the site still works, just without server-rendered HTML.
  let ssr: SsrModule | null = null;
  try {
    ssr = require(path.resolve(__dirname, "server", "entry-server.cjs"));
  } catch (error) {
    console.error("⚠️  SSR bundle not loaded, serving the client-only page:", error);
  }

  // index: false so "/" goes through the renderer below instead of the bare index.html.
  app.use(express.static(distPath, { index: false }));

  app.get("/{*path}", async (req, res) => {
    let html = template;
    let status = 200;
    try {
      const page = await resolvePage(req);
      status = page.status;
      if (page.head) html = html.replace(HEAD_BLOCK, renderHead(page.head));
      if (ssr) {
        const rendered = ssr.render(req.originalUrl, page.prefetched);
        html = html
          .replace("<!--app-html-->", () => rendered.html)
          .replace("<!--app-state-->", () => `<script>window.__RQ_STATE__=${inlineJson(rendered.state)}</script>`);
      }
    } catch (error) {
      // A database or render failure still serves the app; the browser renders it client-side.
      console.error("❌ Server render failed for", req.originalUrl, error);
      html = template;
      status = 200;
    }
    res.status(status).type("html").set("Cache-Control", "no-cache").send(html);
  });
}
