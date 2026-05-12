import { Badge } from "@/components/ui/badge";
import { Building2, MapPin, Bot, Zap, Globe2, FileText } from "lucide-react";
import { motion } from "framer-motion";

const technologies = [
  { name: "n8n", description: "Workflow Otomasyon" },
  { name: "Claude AI", description: "Anthropic" },
  { name: "Gemini API", description: "Google AI" },
  { name: "OpenAI API", description: "GPT-4o" },
  { name: "Vibe Coding", description: "AI Geliştirme" },
  { name: "React / Next.js", description: "Frontend" },
  { name: "Node.js", description: "Backend" },
  { name: "React Native", description: "Mobil" },
];

const focusAreas = [
  { icon: Bot, title: "CRM Otomasyonu", description: "Satış ve müşteri süreçlerini n8n ile otomatize edin" },
  { icon: Zap, title: "E-posta & Pazarlama", description: "Akıllı tetikleyici bazlı kampanyalar" },
  { icon: Globe2, title: "Veri & Raporlama", description: "Otomatik dashboard ve analitik sistemler" },
  { icon: FileText, title: "Belge Otomasyonu", description: "Fatura, sözleşme ve form işleme" },
];

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              <Building2 className="w-4 h-4 mr-2" />
              Hakkımızda
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Yapay Zeka ile{" "}
              <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                İş Süreçlerini
              </span>{" "}
              Dönüştürüyoruz
            </h2>

            <p className="text-lg text-muted-foreground mb-4">
              i-novaria, Ankara merkezli bir dijital dönüşüm ve yapay zeka otomasyon danışmanlık
              firmasıdır.{" "}
              <strong className="text-foreground">
                n8n, Claude AI, Gemini API ve OpenAI API
              </strong>{" "}
              kullanarak işletmelerin tekrar eden süreçlerini otomatize ediyoruz.
            </p>

            <p className="text-muted-foreground mb-4">
              Vibe Coding yaklaşımıyla web uygulamaları ve mobil oyunlar geliştiriyor; CRM
              entegrasyonundan e-posta otomasyonuna, belge işlemeden veri analitiğine kadar uçtan uca
              AI çözümleri sunuyoruz.
            </p>

            <p className="text-muted-foreground mb-8">
              Büyük kurumsal yazılımlar yerine işletmenize özel, ölçeklenebilir otomasyon sistemleri
              kuruyoruz.
            </p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 text-violet-600" />
              <span>Ankara, Türkiye</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Kullandığımız Teknolojiler
              </h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <div
                    key={tech.name}
                    className="px-3 py-2 rounded-lg bg-card border border-border text-sm"
                  >
                    <span className="font-medium text-foreground">{tech.name}</span>
                    <span className="text-muted-foreground ml-1 text-xs">— {tech.description}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                Uzmanlık Alanlarımız
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {focusAreas.map((area) => (
                  <div key={area.title} className="p-4 rounded-xl bg-card border border-border">
                    <area.icon className="w-5 h-5 text-violet-600 mb-2" />
                    <p className="font-medium text-foreground text-sm">{area.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{area.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
