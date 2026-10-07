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
  return (
    <section id="faq" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
        <div>
          <p className="section-label">Sık sorulan sorular</p>
          <h2 className="font-display mt-3 text-3xl leading-[1.08] text-ink sm:text-4xl">Merak ettikleriniz</h2>
          <p className="mt-4 text-ink-soft">AI otomasyon ve dijital dönüşüm hizmetlerimiz hakkında en çok sorulanlar.</p>
        </div>

        <div className="border-t border-line">
          {faqs.map((faq) => (
            <details key={faq.question} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {faq.question}
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 text-lg leading-none text-faint transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="-mt-1 pb-5 pr-8 leading-relaxed text-ink-soft">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
