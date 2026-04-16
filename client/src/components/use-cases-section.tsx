import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Package, 
  LayoutDashboard, 
  UserCog, 
  FolderKanban,
  Briefcase,
  ArrowRight,
  Receipt
} from "lucide-react";
import { motion } from "framer-motion";

const useCases = [
  {
    icon: Users,
    title: "CRM Sistemleri",
    description: "Müşteri ilişkilerini yönetin, satış hunisini takip edin ve müşteri verilerini tek bir platformda birleştirin.",
    features: ["Müşteri 360 Görünümü", "Satış Otomasyonu", "Lead Yönetimi"],
    color: "violet"
  },
  {
    icon: Package,
    title: "ERP Çözümleri",
    description: "İş süreçlerinizi entegre edin. Finans, stok, üretim ve insan kaynaklarını tek çatıda yönetin.",
    features: ["Stok Yönetimi", "Finansal Raporlama", "Tedarik Zinciri"],
    color: "indigo"
  },
  {
    icon: Receipt,
    title: "Vergi Hesabım",
    description: "Yapay zeka destekli fiş takip ve vergi yönetim platformu. Fişlerinizi fotoğraflayarak otomatik gider takibi yapın.",
    features: ["Akıllı Fiş Tarama", "KDV Takibi", "Gider Raporlama"],
    color: "purple",
    link: "https://vergihesabim.com"
  },
  {
    icon: LayoutDashboard,
    title: "İş Zekası Dashboard'ları",
    description: "Verilerinizi görünür kılın. Gerçek zamanlı metrikler, KPI takibi ve karar destek sistemleri.",
    features: ["Gerçek Zamanlı Analiz", "KPI Takibi", "Özel Raporlar"],
    color: "blue"
  },
  {
    icon: UserCog,
    title: "HR Yönetim Sistemleri",
    description: "Çalışanlarınızı etkili yönetin. İşe alım, performans değerlendirme ve izin takibi.",
    features: ["İşe Alım Süreçleri", "Performans Yönetimi", "İzin Takibi"],
    color: "teal"
  },
  {
    icon: FolderKanban,
    title: "Proje Yönetimi",
    description: "Projelerinizi planlayın ve takip edin. Görev atama, zaman çizelgesi ve kaynak yönetimi.",
    features: ["Görev Yönetimi", "Gantt Grafikleri", "Ekip İş Birliği"],
    color: "orange"
  }
];

const colorMap: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-600",
  indigo: "bg-indigo-500/10 text-indigo-600",
  purple: "bg-purple-500/10 text-purple-600",
  blue: "bg-blue-500/10 text-blue-600",
  teal: "bg-teal-500/10 text-teal-600",
  orange: "bg-orange-500/10 text-orange-600"
};

export function UseCasesSection() {
  return (
    <section id="use-cases" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-use-cases">
              <Briefcase className="w-4 h-4 mr-2" />
              Kullanım Alanları
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            data-testid="text-use-cases-heading"
          >
            Her İhtiyaca{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Özel Çözümler
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-use-cases-description"
          >
            Xpoda ile basit bir landing page'den karmaşık kurumsal uygulamalara kadar 
            her ölçekte çözüm üretebilirsiniz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, index) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate overflow-visible" data-testid={`card-use-case-${index}`}>
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${colorMap[useCase.color]} flex items-center justify-center mb-4`}>
                    <useCase.icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2" data-testid={`text-use-case-title-${index}`}>
                    {useCase.link ? (
                      <a 
                        href={useCase.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        {useCase.title}
                        <ArrowRight className="w-4 h-4 opacity-50" />
                      </a>
                    ) : (
                      <>
                        {useCase.title}
                        <ArrowRight className="w-4 h-4 opacity-50" />
                      </>
                    )}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4" data-testid={`text-use-case-description-${index}`}>
                    {useCase.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {useCase.features.map((feature, fIndex) => (
                      <Badge key={feature} variant="outline" className="text-xs" data-testid={`badge-feature-${index}-${fIndex}`}>
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
