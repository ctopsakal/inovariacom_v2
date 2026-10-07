import type { Express } from "express";
import type { BlogPost } from "@shared/schema";
import { storage } from "./storage";
import { PRODUCTS } from "../client/src/lib/products";
import { SERVICES } from "../client/src/lib/services";

// The site answers on www; i-novaria.com redirects here. Every absolute URL must use this host.
export const SITE_URL = "https://www.i-novaria.com";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export function escapeAttr(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** JSON for an inline <script>; escapes "<" so content can't close the tag. */
export function inlineJson(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Plain-text summary of Markdown, for meta descriptions. */
export function plainText(markdown: string, max = 160): string {
  const text = markdown
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    // Line-start markers only, so hyphenated words like "e-posta" survive.
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, " ")
    .replace(/[*_`|]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length <= max ? text : `${text.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export type PageHead = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  jsonLd?: unknown;
  publishedTime?: string;
  modifiedTime?: string;
};

/** The <head> tags that differ per page; replaces the page-head block of client/index.html. */
export function renderHead(head: PageHead): string {
  const url = `${SITE_URL}${head.path}`;
  const title = escapeAttr(head.title);
  const description = escapeAttr(head.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${head.noindex ? "noindex, follow" : "index, follow"}" />`,
    ...(head.noindex ? [] : [`<link rel="canonical" href="${url}" />`]),
    `<meta property="og:type" content="${head.type ?? "website"}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="tr_TR" />`,
    `<meta property="og:site_name" content="i-novaria" />`,
    ...(head.publishedTime ? [`<meta property="article:published_time" content="${head.publishedTime}" />`] : []),
    ...(head.modifiedTime ? [`<meta property="article:modified_time" content="${head.modifiedTime}" />`] : []),
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...(head.jsonLd ? [`<script type="application/ld+json">${inlineJson(head.jsonLd)}</script>`] : []),
  ];
  return tags.map((t) => `    ${t}`).join("\n") + "\n";
}

const ORG_ID = `${SITE_URL}/#organization`;

export function blogListHead(posts: BlogPost[]): PageHead {
  return {
    title: "Blog | i-novaria",
    description:
      "Vibe Coding, yapay zekâ otomasyonu, n8n ve modern yazılım geliştirme üzerine i-novaria'nın yazıları.",
    path: "/blog",
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Blog",
          "@id": `${SITE_URL}/blog#blog`,
          name: "i-novaria Blog",
          url: `${SITE_URL}/blog`,
          inLanguage: "tr",
          publisher: { "@id": ORG_ID },
          blogPost: posts.slice(0, 20).map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: new Date(p.createdAt).toISOString(),
          })),
        },
        breadcrumbs([["Blog", "/blog"]]),
      ],
    },
  };
}

export function blogPostHead(post: BlogPost): PageHead {
  const path = `/blog/${post.slug}`;
  const published = new Date(post.createdAt).toISOString();
  const modified = new Date(post.updatedAt).toISOString();
  return {
    title: `${post.title} | i-novaria Blog`,
    description: plainText(post.excerpt || post.content),
    path,
    type: "article",
    publishedTime: published,
    modifiedTime: modified,
    jsonLd: {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "BlogPosting",
          "@id": `${SITE_URL}${path}#article`,
          headline: post.title,
          description: plainText(post.excerpt || post.content, 300),
          url: `${SITE_URL}${path}`,
          mainEntityOfPage: `${SITE_URL}${path}`,
          image: OG_IMAGE,
          datePublished: published,
          dateModified: modified,
          inLanguage: "tr",
          wordCount: post.content.split(/\s+/).length,
          author: { "@id": ORG_ID },
          publisher: { "@id": ORG_ID },
          isPartOf: { "@id": `${SITE_URL}/blog#blog` },
        },
        breadcrumbs([
          ["Blog", "/blog"],
          [post.title, path],
        ]),
      ],
    },
  };
}

function breadcrumbs(items: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Ana sayfa", "/"] as [string, string], ...items].map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: `${SITE_URL}${path}`,
    })),
  };
}

export const NOT_FOUND_HEAD: PageHead = {
  title: "Sayfa bulunamadı | i-novaria",
  description: "Aradığınız sayfa bulunamadı.",
  path: "/404",
  noindex: true,
};

export const ADMIN_HEAD: PageHead = {
  title: "Yönetim | i-novaria",
  description: "i-novaria yönetim paneli.",
  path: "/admin",
  noindex: true,
};

function sitemapXml(posts: BlogPost[]): string {
  const latest = posts[0] ? new Date(posts[0].updatedAt).toISOString() : undefined;
  const urls: { loc: string; lastmod?: string; changefreq: string; priority: string }[] = [
    { loc: `${SITE_URL}/`, changefreq: "weekly", priority: "1.0" },
    { loc: `${SITE_URL}/blog`, lastmod: latest, changefreq: "daily", priority: "0.8" },
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: new Date(p.updatedAt).toISOString(),
      changefreq: "monthly",
      priority: "0.6",
    })),
  ];
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${escapeAttr(u.loc)}</loc>\n` +
        (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : "") +
        `    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

/** llms.txt (https://llmstxt.org): a plain summary of the company for AI agents. */
function llmsTxt(posts: BlogPost[]): string {
  const lines = [
    "# i-novaria",
    "",
    "> i-novaria, Ankara merkezli bir yapay zekâ otomasyonu ve dijital dönüşüm stüdyosudur. n8n, Claude AI, Gemini API ve OpenAI API ile işletmelerin tekrar eden süreçlerini otomatize eder; Vibe Coding yaklaşımıyla web uygulamaları, e-ticaret sistemleri ve mobil oyunlar geliştirir. Kendi ürünlerini de geliştirip işletir.",
    "",
    "- Konum: Ankara, Türkiye (Türkiye geneline hizmet)",
    "- E-posta: info@i-novaria.com",
    `- Web: ${SITE_URL}/`,
    "- Dil: Türkçe",
    "",
    "## Hizmetler",
    "",
    ...SERVICES.map((s) => `- **${s.title}**: ${s.description} (${s.benefits.join(", ")})`),
    "",
    "## Kendi ürünlerimiz",
    "",
    ...PRODUCTS.map((p) => `- [${p.name}](${p.url}): ${p.kind}. ${p.tagline}`),
    "",
    "## Sayfalar",
    "",
    `- [Ana sayfa](${SITE_URL}/): hizmetler, ürünler, sık sorulan sorular ve iletişim formu`,
    `- [Blog](${SITE_URL}/blog): yapay zekâ, otomasyon ve yazılım geliştirme yazıları`,
    `- [İletişim](${SITE_URL}/#contact): proje talebi için form`,
  ];
  if (posts.length > 0) {
    lines.push("", "## Blog yazıları", "");
    for (const p of posts.slice(0, 30)) {
      lines.push(`- [${p.title}](${SITE_URL}/blog/${p.slug}): ${plainText(p.excerpt, 200)}`);
    }
  }
  return lines.join("\n") + "\n";
}

async function publishedPosts(): Promise<BlogPost[]> {
  try {
    return await storage.getBlogPosts();
  } catch (error) {
    console.error("❌ Error loading blog posts for SEO files:", error);
    return [];
  }
}

export function registerSeoRoutes(app: Express) {
  app.get("/sitemap.xml", async (_req, res) => {
    res.type("application/xml").set("Cache-Control", "public, max-age=3600").send(sitemapXml(await publishedPosts()));
  });

  app.get("/llms.txt", async (_req, res) => {
    res.type("text/plain; charset=utf-8").set("Cache-Control", "public, max-age=3600").send(llmsTxt(await publishedPosts()));
  });

  app.get("/robots.txt", (_req, res) => {
    res
      .type("text/plain")
      .send(`User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /api/\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  });
}
