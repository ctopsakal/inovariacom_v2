import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { Telegraf } from "telegraf";
import Anthropic from "@anthropic-ai/sdk";
import type { ContactMessage, BlogPost } from "@shared/schema";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "inovaria2026";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const CRON_SECRET = process.env.CRON_SECRET;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

let bot: Telegraf | null = null;

console.log("🤖 Telegram Configuration:");
console.log("   Token configured:", !!TELEGRAM_BOT_TOKEN);
console.log("   Chat ID configured:", !!TELEGRAM_CHAT_ID);
console.log("🤖 Blog Configuration:");
console.log("   ANTHROPIC_API_KEY configured:", !!ANTHROPIC_API_KEY);
console.log("   CRON_SECRET configured:", !!CRON_SECRET);

if (TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID) {
  try {
    bot = new Telegraf(TELEGRAM_BOT_TOKEN);
    console.log("✅ Telegram bot initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize Telegram bot:", error);
  }
} else {
  console.warn("⚠️  Telegram bot not configured - messages won't be sent to Telegram");
}

function formatTelegramMessage(msg: ContactMessage): string {
  let text = `📩 <b>Yeni İletişim Mesajı</b>\n\n`;
  text += `<b>İsim:</b> ${escapeHtml(msg.name)}\n`;
  text += `<b>Email:</b> ${escapeHtml(msg.email)}\n`;
  if (msg.phone) {
    text += `<b>Telefon:</b> ${escapeHtml(msg.phone)}\n`;
  }
  if (msg.company) {
    text += `<b>Şirket:</b> ${escapeHtml(msg.company)}\n`;
  }
  text += `<b>Konu:</b> ${getSubjectLabel(msg.subject)}\n`;
  text += `<b>Tarih:</b> ${new Date(msg.createdAt).toLocaleString("tr-TR")}\n\n`;
  text += `<b>Mesaj:</b>\n${escapeHtml(msg.message)}`;
  return text;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getSubjectLabel(subject: string): string {
  const labels: Record<string, string> = {
    demo: "Demo Talebi",
    pricing: "Fiyat Bilgisi",
    support: "Teknik Destek",
    other: "Diğer",
  };
  return labels[subject] || subject;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);
}

async function generateBlogPost(): Promise<{ title: string; content: string; excerpt: string }> {
  const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

  const topics = [
    "vibe coding ve AI destekli yazılım geliştirme",
    "2024-2025 yapay zeka trendleri ve freelance yazılımcı",
    "Claude, GPT ve diğer LLM'lerle proje geliştirme",
    "React ve modern frontend development trendleri",
    "Otomatize yazılım geliştirmede prompt engineering",
    "Vibecoding ile hızlı prototipleme",
    "AI copilot araçları ve produktivite",
    "Doğal dil ile kod yazma geleceği",
  ];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const message = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [
      {
        role: "user",
        content: `Bir teknoloji blogu için "${topic}" hakkında Türkçe bir blog yazısı yaz.

Format:
BASLIK: [Dikkat çekici, SEO dostu başlık]
OZET: [1-2 cümle özet, max 200 karakter]
ICERIK:
[Markdown formatında, ## alt başlıklar ile bölünmüş, 600-900 kelime]

Yazı:
- i-novaria (freelance vibe coding & dijital çözümler) perspektifinden olsun
- Pratik, bilgilendirici ve profesyonel ton
- Okuyucu için somut değer sunmalı`,
      },
    ],
  });

  const raw = message.content[0].type === "text" ? message.content[0].text : "";

  const titleMatch = raw.match(/BASLIK:\s*(.+)/);
  const excerptMatch = raw.match(/OZET:\s*(.+)/);
  const contentMatch = raw.match(/ICERIK:\s*([\s\S]+)/);

  if (!titleMatch || !excerptMatch || !contentMatch) {
    throw new Error("AI response format geçersiz");
  }

  return {
    title: titleMatch[1].trim(),
    excerpt: excerptMatch[1].trim(),
    content: contentMatch[1].trim(),
  };
}

async function sendBlogTelegramNotification(post: BlogPost) {
  if (!bot || !TELEGRAM_CHAT_ID) return;
  const text = `📝 <b>Yeni Blog Yazısı Yayınlandı!</b>\n\n`
    + `<b>Başlık:</b> ${escapeHtml(post.title)}\n`
    + `<b>Özet:</b> ${escapeHtml(post.excerpt)}\n`
    + `<b>Tarih:</b> ${new Date(post.createdAt).toLocaleString("tr-TR")}\n\n`
    + `<a href="https://i-novaria.com/blog/${post.slug}">Yazıyı Oku</a>`;

  try {
    await bot.telegram.sendMessage(TELEGRAM_CHAT_ID, text, { parse_mode: "HTML" });
  } catch (error) {
    console.error("❌ Blog Telegram bildirimi gönderilemedi:", error);
  }
}

async function sendTelegramMessage(msg: ContactMessage) {
  if (!bot || !TELEGRAM_CHAT_ID) {
    console.warn("⚠️  Telegram bot not configured - skipping message send");
    return;
  }

  try {
    console.log("🔗 Connecting to Telegram API with chat ID:", TELEGRAM_CHAT_ID);
    const result = await bot.telegram.sendMessage(TELEGRAM_CHAT_ID, formatTelegramMessage(msg), {
      parse_mode: "HTML",
    });
    console.log("✅ Telegram message sent successfully, message ID:", result.message_id);
  } catch (error) {
    console.error("❌ Failed to send Telegram message:", error);
    if (error instanceof Error) {
      console.error("   Error details:", error.message);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post("/api/contact", async (req, res) => {
    try {
      console.log("📨 Contact form received:", req.body.name, req.body.email);
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      console.log("💾 Message saved to database with ID:", message.id);

      // Send to Telegram
      console.log("📤 Sending to Telegram...");
      await sendTelegramMessage(message);
      console.log("✅ Telegram message sent successfully");

      res.json({ success: true, message });
    } catch (error) {
      console.error("❌ Error in contact endpoint:", error);
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  app.get("/api/blog", async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json({ success: true, posts });
    } catch (error) {
      console.error("❌ Error fetching blog posts:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.get("/api/blog/:slug", async (req, res) => {
    try {
      const post = await storage.getBlogPostBySlug(req.params.slug);
      if (!post) {
        return res.status(404).json({ success: false, error: "Post not found" });
      }
      storage.incrementViewCount(post.id).catch(console.error);
      res.json({ success: true, post });
    } catch (error) {
      console.error("❌ Error fetching blog post:", error);
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  app.post("/api/cron/generate-post", async (req, res) => {
    const secret = req.headers["x-cron-secret"] || req.body?.secret;

    if (!CRON_SECRET || secret !== CRON_SECRET) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }

    if (!ANTHROPIC_API_KEY) {
      return res.status(500).json({ success: false, error: "ANTHROPIC_API_KEY not configured" });
    }

    try {
      console.log("🤖 AI blog post üretimi başladı...");
      const generated = await generateBlogPost();
      console.log("📝 AI yanıtı:", { title: generated.title, excerptLength: generated.excerpt.length, contentLength: generated.content.length });

      let slug = generateSlug(generated.title);
      console.log("🔗 Generated slug:", slug);

      const existing = await storage.getBlogPostBySlug(slug);
      if (existing) {
        slug = `${slug}-${Date.now()}`;
        console.log("⚠️  Slug conflict, using:", slug);
      }

      const postData = {
        title: generated.title,
        slug,
        content: generated.content,
        excerpt: generated.excerpt,
        published: true,
      };
      console.log("💾 Attempting to save:", { title: postData.title, slug: postData.slug });

      const post = await storage.createBlogPost(postData);
      console.log(`✅ Blog post oluşturuldu: ${post.title} (${post.slug}) - ID: ${post.id}`);

      await sendBlogTelegramNotification(post);

      res.json({ success: true, post });
    } catch (error) {
      console.error("❌ Blog post üretimi hatası:", error);
      if (error instanceof Error) {
        console.error("   Message:", error.message);
        console.error("   Stack:", error.stack);
      }
      res.status(500).json({ success: false, error: "Post generation failed", details: error instanceof Error ? error.message : String(error) });
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    // Disabled - use Telegram bot instead
    res.status(403).json({ success: false, error: "Admin panel is disabled" });
  });

  app.get("/api/contact", async (req, res) => {
    // Disabled - use Telegram bot instead
    res.status(403).json({ success: false, error: "Admin panel is disabled" });
  });

  return httpServer;
}
