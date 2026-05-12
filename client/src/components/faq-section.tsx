import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "n8n ile iş süreçlerimi nasıl otomatize edebilirsiniz?",
    answer:
      "n8n'in görsel workflow editörünü kullanarak CRM güncellemeleri, e-posta bildirimleri, veri senkronizasyonu ve belge işleme gibi tekrar eden süreçlerinizi otomatize ediyoruz. Sıfırdan kurulum, test ve canlıya alma aşamalarını uçtan uca yönetiyoruz.",
  },
  {
    question: "Küçük ve orta ölçekli işletmeler için en uygun AI otomasyon çözümü nedir?",
    answer:
      "KOBİ'ler için n8n tabanlı otomasyon sistemleri en maliyet etkin çözümdür. Pahalı kurumsal yazılım lisansları yerine işletmeye özel iş akışları kuruyoruz. Tipik başlangıç projesi 2-4 hafta içinde teslim edilir ve hemen ROI üretmeye başlar.",
  },
  {
    question: "Gemini API veya OpenAI API ile neler yapabilirsiniz?",
    answer:
      "Gemini API ve OpenAI API ile akıllı müşteri hizmetleri botları, otomatik içerik üretimi, belge analizi, veri özetleme ve karar destek sistemleri geliştiriyoruz. Bu API'leri n8n workflow'larına entegre ederek tamamen otomatik AI pipeline'ları oluşturuyoruz.",
  },
  {
    question: "CRM otomasyonu kurmak ne kadar sürer ve maliyeti nedir?",
    answer:
      "Temel bir CRM otomasyonu (lead yakalama, atama, takip e-postaları) genellikle 1-2 haftada tamamlanır. Karmaşık entegrasyonlar 3-6 haftayı bulabilir. Fiyatlandırma kapsama göre değiştiğinden projenizi anlatmanızı ve ücretsiz ön görüşme talep etmenizi öneririz.",
  },
  {
    question: "Vibe Coding yaklaşımı nedir ve nasıl çalışır?",
    answer:
      "Vibe Coding, Claude AI, Gemini ve GPT-4o gibi yapay zeka araçlarını geliştirme sürecine tam entegre ederek yazılım üretme hızını dramatik biçimde artıran modern bir yaklaşımdır. React, Next.js ve Node.js stack'iyle geleneksel yönteme kıyasla 3-5x daha hızlı ürün çıkarıyoruz.",
  },
  {
    question: "E-posta pazarlama otomasyonu için hangi araçları kullanıyorsunuz?",
    answer:
      "n8n üzerinden Mailchimp, SendGrid veya özel SMTP entegrasyonlarıyla tetikleyici bazlı e-posta kampanyaları kuruyoruz. Kullanıcı davranışına göre otomatik segmentasyon ve OpenAI API ile kişiselleştirilmiş içerik üretimi sağlıyoruz.",
  },
  {
    question: "Belge ve fatura otomasyonu hizmetiniz nasıl işliyor?",
    answer:
      "Gelen fatura, sözleşme veya form verilerini otomatik olarak işleyen sistemler kuruyoruz. PDF parse etme, OCR ile veri çıkarma, muhasebe yazılımına otomatik kayıt ve onay akışları n8n ile uçtan uca otomatize ediliyor. Mevcut ERP veya muhasebe sisteminizle entegrasyon da sağlıyoruz.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="w-4 h-4 mr-2" />
              Sık Sorulan Sorular
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Merak Ettiğiniz{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
              Her Şey
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground"
          >
            AI otomasyon ve dijital dönüşüm hizmetlerimiz hakkında en çok sorulan sorular
          </motion.p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <button
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  aria-expanded={openIndex === index}
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <p className="px-6 pb-6 text-muted-foreground">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
