import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  PiggyBank, 
  Users, 
  TrendingUp, 
  CheckCircle2,
  Target
} from "lucide-react";
import { motion } from "framer-motion";

const advantages = [
  {
    icon: Clock,
    title: "Hız ve Verimlilik",
    stat: "%90",
    statLabel: "Geliştirme Süresi Tasarrufu",
    description: "Geleneksel yöntemlere kıyasla 2-5 kat daha hızlı uygulama geliştirme. Pazara çıkış süresini %70'e kadar kısaltın.",
    benefits: [
      "Anında prototipleme",
      "Hızlı iterasyon döngüleri",
      "Azaltılmış test süresi"
    ],
    color: "violet"
  },
  {
    icon: PiggyBank,
    title: "Maliyet Tasarrufu",
    stat: "$187K",
    statLabel: "Yıllık Ortalama Tasarruf",
    description: "Özel geliştirme ekiplerine olan ihtiyacı ortadan kaldırarak geliştirme maliyetlerini %60'a kadar düşürün.",
    benefits: [
      "Düşük bakım maliyeti",
      "6-12 ay geri ödeme",
      "%253 ROI potansiyeli"
    ],
    color: "green"
  },
  {
    icon: Users,
    title: "Vatandaş Geliştirici",
    stat: "4:1",
    statLabel: "Profesyonel Geliştiricilere Oran",
    description: "Teknik olmayan ekipler bile uygulama geliştirebilir. IT bağımlılığını azaltın, iş birimlerini güçlendirin.",
    benefits: [
      "Kod bilgisi gerektirmez",
      "Sezgisel arayüz",
      "Herkese açık platform"
    ],
    color: "blue"
  },
  {
    icon: TrendingUp,
    title: "Ölçeklenebilirlik",
    stat: "Sınırsız",
    statLabel: "Büyüme Kapasitesi",
    description: "Uygulamalarınız işletmenizle birlikte büyür. Kapsamlı kodlama veya IT kaynakları olmadan sorunsuz ölçeklendirin.",
    benefits: [
      "Esnek altyapı",
      "Kolay güncelleme",
      "Modüler yapı"
    ],
    color: "purple"
  }
];

const colorMap: Record<string, string> = {
  violet: "from-violet-600 to-violet-500",
  green: "from-green-600 to-green-500",
  blue: "from-blue-600 to-blue-500",
  purple: "from-purple-600 to-purple-500"
};

const iconBgMap: Record<string, string> = {
  violet: "bg-violet-500/10 text-violet-600",
  green: "bg-green-500/10 text-green-600",
  blue: "bg-blue-500/10 text-blue-600",
  purple: "bg-purple-500/10 text-purple-600"
};

export function AdvantagesSection() {
  return (
    <section id="advantages" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4" data-testid="badge-advantages">
              <Target className="w-4 h-4 mr-2" />
              No-Code Avantajları
            </Badge>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4"
            data-testid="text-advantages-heading"
          >
            Neden{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              No-Code/Low-Code?
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-advantages-description"
          >
            Geleneksel yazılım geliştirme yöntemlerinin sınırlamalarını ortadan kaldırın. 
            No-code/low-code ile rekabet avantajı kazanın.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {advantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate overflow-visible" data-testid={`card-advantage-${index}`}>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className={`w-14 h-14 rounded-xl ${iconBgMap[advantage.color]} flex items-center justify-center`}>
                        <advantage.icon className="w-7 h-7" />
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="text-xl font-semibold text-foreground" data-testid={`text-advantage-title-${index}`}>
                          {advantage.title}
                        </h3>
                        <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${colorMap[advantage.color]} text-white text-sm font-bold`} data-testid={`text-advantage-stat-${index}`}>
                          {advantage.stat}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1" data-testid={`text-advantage-statlabel-${index}`}>{advantage.statLabel}</p>
                      
                      <p className="text-muted-foreground mb-4" data-testid={`text-advantage-description-${index}`}>
                        {advantage.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {advantage.benefits.map((benefit, bIndex) => (
                          <li key={benefit} className="flex items-center gap-2 text-sm text-foreground" data-testid={`text-benefit-${index}-${bIndex}`}>
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
      </div>
    </section>
  );
}
