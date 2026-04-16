import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { z } from "zod";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "inovaria2026";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/contact", async (req, res) => {
    try {
      const validatedData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validatedData);
      res.json({ success: true, message });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, errors: error.errors });
      } else {
        res.status(500).json({ success: false, error: "Internal server error" });
      }
    }
  });

  app.post("/api/admin/login", async (req, res) => {
    const { password } = req.body;
    if (password === ADMIN_PASSWORD) {
      res.json({ success: true, token: "admin-authenticated" });
    } else {
      res.status(401).json({ success: false, error: "Yanlış şifre" });
    }
  });

  app.get("/api/contact", async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || authHeader !== "Bearer admin-authenticated") {
      return res.status(401).json({ success: false, error: "Yetkisiz erişim" });
    }
    
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ success: false, error: "Internal server error" });
    }
  });

  return httpServer;
}
