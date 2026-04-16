import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  TrendingUp, 
  Building2, 
  Users2, 
  Brain, 
  Globe2,
  ArrowUpRight
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    value: "$30B+",
    label: "2026 Pazar Büyüklüğü",
    description: "Low-code pazar büyüklüğü 2030'a kadar $101.7B'a ulaşacak",
    icon: TrendingUp,
    color: "violet"
  },
  {
    value: "%70",
    label: "Kurumsal Benimseme",
    description: "2026'da yeni kurumsal uygulamaların %70-75'i no-code/low-code kullanacak",
    icon: Building2,
    color: "indigo"
  },
  {
    value: "4:1",
    label: "Vatandaş Geliştirici Oranı",
    description: "Vatandaş geliştiriciler profesyonel geliştiricileri 4'e 1 oranında geçer",
    icon: Users2,
    color: "purple"
  },
  {
    value: "%40-60",
    label: "AI ile Hızlanma",
    description: "AI entegrasyonu geliştirme döngüsünü %40-60 hızlandırıyor",
    icon: Brain,
    color: "blue"
  }
];

const trends = [
  {
    title: "AI Entegrasyonu",
    description: "Yapay zeka destekli kod önerme, veri modelleme ve tekrarlayan görevlerin otomasyonu",
    growth: "En hızlı büyüyen trend"
  },
  {
    title: "Endüstri Odaklı Çözümler",
    description: "Sağlık, eğitim, perakende ve finans sektörlerine özel hazır şablonlar",
    growth: "Hızla yaygınlaşıyor"
  },
  {
    title: "Hiper Otomasyon",
    description: "AI, makine öğrenimi ve RPA'yı birleştiren kapsamlı otomasyon stratejileri",
    growth: "%30 kurumsal benimseme"
  },
  {
    title: "Kritik Görev Uygulamaları",
    description: "2029'a kadar kritik görev uygulamalarının %80'i low-code tabanlı olacak",
    growth: "Hızla artış gösteriyor"
  }
];

const colorMap: Record<string, string> = {
  violet: "from-violet-600 to-violet-500",
  indigo: "from-indigo-600 to-indigo-500",
  purple: "from-purple-600 to-purple-500",
  blue: "from-blue-600 to-blue-500"
};

const iconBgMap: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-600",
  indigo: "bg-indigo-500/10 text-indigo-600",
  purple: "bg-purple-500/10 text-purple-600",
  blue: "bg-blue-500/10 text-blue-600"
};

export function TrendsSection() {
  return (
    <section id="trends" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-trends">
              <Globe2 className="w-4 h-4 mr-2" />
              2026 Global Trendler
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            data-testid="text-trends-heading"
          >
            Dünya{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              No-Code'a Yöneliyor
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-trends-description"
          >
            No-code/low-code artık deneysel değil, stratejik bir zorunluluk. 
            Global trendleri takip edin, geride kalmayın.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover-elevate overflow-visible" data-testid={`card-stat-${index}`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${iconBgMap[stat.color]} flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className={`text-3xl font-bold bg-gradient-to-r ${colorMap[stat.color]} bg-clip-text text-transparent mb-1`} data-testid={`text-stat-value-${index}`}>
                    {stat.value}
                  </p>
                  <p className="font-medium text-foreground mb-2" data-testid={`text-stat-label-${index}`}>{stat.label}</p>
                  <p className="text-sm text-muted-foreground" data-testid={`text-stat-description-${index}`}>{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-foreground text-center mb-8" data-testid="text-trends-subtitle">
            2026'nın Önemli Trendleri
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {trends.map((trend, index) => (
              <motion.div
                key={trend.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <Card className="h-full hover-elevate overflow-visible" data-testid={`card-trend-${index}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h4 className="text-lg font-semibold text-foreground" data-testid={`text-trend-title-${index}`}>
                        {trend.title}
                      </h4>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                    <p className="text-muted-foreground mb-3" data-testid={`text-trend-description-${index}`}>{trend.description}</p>
                    <Badge variant="secondary" className="text-xs" data-testid={`badge-trend-growth-${index}`}>
                      {trend.growth}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-violet-600/10 to-indigo-600/10 border border-violet-500/20" data-testid="text-trends-summary">
            <TrendingUp className="w-5 h-5 text-violet-600" />
            <span className="text-sm font-medium text-foreground">
              2030'a kadar $50 milyar kurumsal verimlilik kazancı bekleniyor
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
