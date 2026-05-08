import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";
import { Telegraf } from "telegraf";
import type { ContactMessage } from "@shared/schema";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "inovaria2026";
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

let bot: Telegraf | null = null;

console.log("🤖 Telegram Configuration:");
console.log("   Token configured:", !!TELEGRAM_BOT_TOKEN);
console.log("   Chat ID configured:", !!TELEGRAM_CHAT_ID);

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
