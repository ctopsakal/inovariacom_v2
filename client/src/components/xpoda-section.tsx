import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MousePointerClick, 
  Workflow, 
  BarChart3, 
  Smartphone, 
  Plug, 
  Shield,
  Layers,
  Zap,
  Handshake
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: MousePointerClick,
    title: "Sürükle-Bırak Geliştirme",
    description: "Kod yazmadan, görsel arayüz üzerinde sürükle-bırak yöntemiyle uygulamalar oluşturun. Teknik bilgi gerektirmez.",
    color: "violet"
  },
  {
    icon: Workflow,
    title: "İş Süreci Otomasyonu",
    description: "Güçlü workflow motoru ile iş akışlarınızı tasarlayın, veri entegrasyonları yapın, e-posta ve SMS bildirimleri gönderin.",
    color: "indigo"
  },
  {
    icon: BarChart3,
    title: "İş Zekası & Raporlama",
    description: "Karmaşık veri setlerinden anlamlı raporlar oluşturun. Grafikler, listeler ve haritalar ile verinizi görselleştirin.",
    color: "purple"
  },
  {
    icon: Smartphone,
    title: "Çoklu Platform Desteği",
    description: "Tek bir geliştirme ile iOS, Android ve web platformlarında sorunsuz çalışan uygulamalar oluşturun.",
    color: "blue"
  },
  {
    icon: Plug,
    title: "Kolay Entegrasyon",
    description: "Microsoft Power Apps, Azure ve diğer sistemlerle hazır entegrasyonlar. API bağlantıları ile sınırsız esneklik.",
    color: "teal"
  },
  {
    icon: Shield,
    title: "Kurumsal Güvenlik",
    description: "Görsel araçlar ve önceden test edilmiş bileşenlerle kod hataları ve güvenlik açıkları minimize edilir.",
    color: "green"
  }
];

const colorMap: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-600",
  indigo: "bg-indigo-500/10 text-indigo-600",
  purple: "bg-purple-500/10 text-purple-600",
  blue: "bg-blue-500/10 text-blue-600",
  teal: "bg-teal-500/10 text-teal-600",
  green: "bg-green-500/10 text-green-600"
};

export function XpodaSection() {
  return (
    <section id="xpoda" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4"
          >
            <Badge variant="secondary" data-testid="badge-xpoda">
              <Layers className="w-4 h-4 mr-2" />
              Platform Özellikleri
            </Badge>
            <Badge className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0" data-testid="badge-partner">
              <Handshake className="w-4 h-4 mr-2" />
              Resmi Çözüm Ortağı
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            data-testid="text-xpoda-heading"
          >
            Xpoda ile{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Sınırlar Ortadan Kalkıyor
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-xpoda-description"
          >
            Dünyanın en iyi 20 no-code/low-code platformundan biri olan Xpoda, 
            kurumsal uygulama geliştirmeyi herkes için erişilebilir kılar. 
            <strong className="text-foreground"> i-novaria olarak Xpoda'nın resmi çözüm ortağıyız.</strong>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate overflow-visible" data-testid={`card-feature-${index}`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-lg ${colorMap[feature.color]} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2" data-testid={`text-feature-title-${index}`}>
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground" data-testid={`text-feature-description-${index}`}>
                    {feature.description}
                  </p>
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
          className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-indigo-600/10 border border-violet-500/20"
          data-testid="card-xpoda-summary"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground" data-testid="text-xpoda-summary-title">Desteklenen Kullanım Alanları</h3>
                <p className="text-muted-foreground" data-testid="text-xpoda-summary-description">CRM, ERP, Dashboard, Portal ve daha fazlası</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" data-testid="badge-crm">CRM</Badge>
              <Badge variant="secondary" data-testid="badge-erp">ERP</Badge>
              <Badge variant="secondary" data-testid="badge-dashboard">Dashboard</Badge>
              <Badge variant="secondary" data-testid="badge-hr">HR Yönetimi</Badge>
              <Badge variant="secondary" data-testid="badge-project">Proje Yönetimi</Badge>
              <Badge variant="secondary" data-testid="badge-tax">Vergi Yönetimi</Badge>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
