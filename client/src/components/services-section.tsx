import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  TrendingUp,
  Globe,
  ShoppingCart,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Layers
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Sparkles,
    title: "Vibe Coding",
    badge: "Yeni Nesil Geliştirme",
    description: "AI destekli, akış halinde kod yazma yaklaşımıyla projelerinizi olağanüstü hızda hayata geçiriyorum. Fikirden ürüne geçişi radikal biçimde hızlandırıyorum.",
    benefits: [
      "AI-assisted geliştirme süreci",
      "Rapid prototyping & iterasyon",
      "React Native, Next.js, Node.js",
      "Temiz, sürdürülebilir kod mimarisi"
    ],
    color: "violet",
    highlight: true
  },
  {
    icon: TrendingUp,
    title: "Dijital Dönüşüm Danışmanlığı",
    badge: "Strateji & Uygulama",
    description: "İşletmenizin dijitalleşme yolculuğunu baştan sona planlıyor ve uyguluyorum. Süreç otomasyonundan dijital altyapı kurulumuna kadar kapsamlı danışmanlık.",
    benefits: [
      "Dijital altyapı analizi",
      "Süreç otomasyonu (n8n, Zapier)",
      "Teknik strateji danışmanlığı",
      "Uygulama ve takip desteği"
    ],
    color: "indigo",
    highlight: false
  },
  {
    icon: Globe,
    title: "Web Sitesi Tasarımı",
    badge: "Modern & Hızlı",
    description: "Markanızı yansıtan, dönüşüm odaklı web siteleri tasarlıyor ve geliştiriyorum. Performans, SEO ve kullanıcı deneyimi ön planda.",
    benefits: [
      "Responsive & mobil uyumlu tasarım",
      "SEO optimizasyonu",
      "Yüksek performans (Core Web Vitals)",
      "CMS entegrasyonu"
    ],
    color: "blue",
    highlight: false
  },
  {
    icon: ShoppingCart,
    title: "E-Ticaret Sistemi",
    badge: "Kurulum & Yönetim",
    description: "Türkiye pazarına uygun, ödeme sistemleri entegre edilmiş e-ticaret çözümleri kuruyorum. Kurulum sonrası yönetim desteği de sunuyorum.",
    benefits: [
      "iyzico, PayTR ödeme entegrasyonu",
      "Stok & sipariş yönetimi",
      "Kargo entegrasyonları",
      "Satış sonrası yönetim desteği"
    ],
    color: "green",
    highlight: false
  },
  {
    icon: Smartphone,
    title: "Mobil Oyun Geliştirme",
    badge: "Android · iOS Yakında",
    description: "React Native & Expo ile Android platformu için mobil oyunlar geliştiriyorum. Google Play Store yayın süreçlerini uçtan uca yönetiyorum.",
    benefits: [
      "React Native / Expo",
      "Google Play Store yayını",
      "Oyun mekaniği & UI/UX tasarımı",
      "iOS desteği yakında"
    ],
    color: "purple",
    highlight: false
  }
];

const colorMap: Record<string, string> = {
  violet: "from-violet-600 to-violet-500",
  indigo: "from-indigo-600 to-indigo-500",
  blue: "from-blue-600 to-blue-500",
  green: "from-green-600 to-green-500",
  purple: "from-purple-600 to-purple-500"
};

const iconBgMap: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-600",
  indigo: "bg-indigo-500/10 text-indigo-600",
  blue: "bg-blue-500/10 text-blue-600",
  green: "bg-green-500/10 text-green-600",
  purple: "bg-purple-500/10 text-purple-600"
};

export function ServicesSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="services" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-services">
              <Layers className="w-4 h-4 mr-2" />
              Hizmetler
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            data-testid="text-services-heading"
          >
            Neler{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Yapıyorum?
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-services-description"
          >
            Fikirden lansmana kadar her aşamada yanınızdayım. 
            Tek bir geliştirici, birden fazla uzmanlık alanı.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={index === 0 ? "lg:col-span-2" : ""}
            >
              <Card
                className={`h-full hover-elevate overflow-visible ${service.highlight ? "border-violet-500/30 bg-gradient-to-br from-violet-600/5 to-indigo-600/5" : ""}`}
                data-testid={`card-service-${index}`}
              >
                <CardContent className="p-6">
                  <div className={`flex flex-col ${index === 0 ? "sm:flex-row" : ""} gap-6`}>
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-xl ${iconBgMap[service.color]} flex items-center justify-center`}>
                        <service.icon className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-foreground" data-testid={`text-service-title-${index}`}>
                          {service.title}
                        </h3>
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${colorMap[service.color]} text-white text-xs font-medium`}>
                          {service.badge}
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4" data-testid={`text-service-description-${index}`}>
                        {service.description}
                      </p>

                      <ul className={`grid ${index === 0 ? "sm:grid-cols-2" : ""} gap-2`}>
                        {service.benefits.map((benefit, bIndex) => (
                          <li key={benefit} className="flex items-center gap-2 text-sm text-foreground" data-testid={`text-service-benefit-${index}-${bIndex}`}>
                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button size="lg" onClick={() => scrollToSection("contact")} className="px-8">
            Projenizi Anlatın
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
