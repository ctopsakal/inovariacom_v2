const services = [
  {
    title: "Vibe Coding",
    badge: "Yeni nesil geliştirme",
    description:
      "Claude AI, Gemini ve GPT-4o'yu geliştirme sürecine tam entegre ederek projelerinizi olağanüstü hızda hayata geçiriyoruz. Fikirden ürüne geçişi 3-5x hızlandırıyoruz.",
    benefits: [
      "Claude AI & GPT-4o ile assisted geliştirme",
      "Rapid prototyping & iterasyon",
      "React Native, Next.js, Node.js",
      "Temiz, sürdürülebilir kod mimarisi",
    ],
  },
  {
    title: "Dijital Dönüşüm Danışmanlığı",
    badge: "AI & otomasyon",
    description:
      "n8n, Claude AI, Gemini API ve OpenAI API ile işletmenizin tekrar eden süreçlerini otomatize ediyoruz. CRM, e-posta, belge işleme ve veri analitiğinden dijital altyapı kurulumuna kapsamlı çözümler.",
    benefits: [
      "CRM ve satış süreci otomasyonu",
      "n8n workflow tasarımı & kurulumu",
      "Claude AI & OpenAI API entegrasyonu",
      "Telegram & Slack bot entegrasyonları",
    ],
  },
  {
    title: "Web Sitesi Tasarımı",
    badge: "Modern & hızlı",
    description:
      "Markanızı yansıtan, dönüşüm odaklı web siteleri tasarlıyor ve geliştiriyoruz. Performans, SEO ve kullanıcı deneyimi ön planda.",
    benefits: ["Responsive & mobil uyumlu tasarım", "SEO optimizasyonu", "Yüksek performans (Core Web Vitals)", "CMS entegrasyonu"],
  },
  {
    title: "E-Ticaret Sistemi",
    badge: "Kurulum & yönetim",
    description:
      "Türkiye pazarına uygun, ödeme sistemleri entegre edilmiş e-ticaret çözümleri kuruyoruz. Kurulum sonrası yönetim desteği de sunuyoruz.",
    benefits: ["iyzico, PayTR ödeme entegrasyonu", "Stok & sipariş yönetimi", "Kargo entegrasyonları", "Satış sonrası yönetim desteği"],
  },
  {
    title: "Mobil Oyun Geliştirme",
    badge: "Android · iOS yakında",
    description:
      "React Native & Expo ile Android platformu için mobil oyunlar geliştiriyoruz. Google Play Store yayın süreçlerini uçtan uca yönetiyoruz.",
    benefits: ["React Native / Expo", "Google Play Store yayını", "Oyun mekaniği & UI/UX tasarımı", "iOS desteği yakında"],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="section-label">Hizmetler</p>
          <h2 className="font-display mt-3 text-3xl leading-[1.08] text-ink sm:text-4xl" data-testid="text-services-heading">
            Fikirden lansmana, <span className="marker">her aşamada</span>
          </h2>
          <p className="mt-4 text-ink-soft" data-testid="text-services-description">
            Tek çatı altında birden fazla uzmanlık alanı. Kapsamı birlikte netleştiriyor, ilk sürümü hızla yayına alıyoruz.
          </p>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn btn-primary mt-6"
          >
            Projenizi anlatın
          </button>
        </div>

        <ol className="border-t border-line">
          {services.map((service, index) => (
            <li
              key={service.title}
              className="grid gap-x-6 gap-y-3 border-b border-line py-7 sm:grid-cols-[3rem_minmax(0,1fr)]"
              data-testid={`card-service-${index}`}
            >
              <span className="font-display text-xl tabular-nums text-faint" aria-hidden>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display text-2xl text-ink" data-testid={`text-service-title-${index}`}>
                    {service.title}
                  </h3>
                  <span className="text-sm text-faint">{service.badge}</span>
                </div>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft" data-testid={`text-service-description-${index}`}>
                  {service.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {service.benefits.map((benefit, bIndex) => (
                    <li key={benefit} className="tag tag-on-ground" data-testid={`text-service-benefit-${index}-${bIndex}`}>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
