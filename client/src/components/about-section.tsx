import { Bot, Zap, Globe2, FileText, MapPin } from "lucide-react";

const technologies = [
  { name: "n8n", description: "Workflow otomasyon" },
  { name: "Claude AI", description: "Anthropic" },
  { name: "Gemini API", description: "Google AI" },
  { name: "OpenAI API", description: "GPT-4o" },
  { name: "Vibe Coding", description: "AI geliştirme" },
  { name: "React / Next.js", description: "Frontend" },
  { name: "Node.js", description: "Backend" },
  { name: "React Native", description: "Mobil" },
];

const focusAreas = [
  { icon: Bot, title: "CRM otomasyonu", description: "Satış ve müşteri süreçlerini n8n ile otomatize edin" },
  { icon: Zap, title: "E-posta & pazarlama", description: "Akıllı tetikleyici bazlı kampanyalar" },
  { icon: Globe2, title: "Veri & raporlama", description: "Otomatik dashboard ve analitik sistemler" },
  { icon: FileText, title: "Belge otomasyonu", description: "Fatura, sözleşme ve form işleme" },
];

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="grid items-start gap-12 lg:grid-cols-2">
        <div>
          <p className="section-label">Hakkımızda</p>
          <h2 className="font-display mt-3 text-3xl leading-[1.08] text-ink sm:text-4xl">
            Yapay zekâ ile <span className="marker">iş süreçlerini</span> dönüştürüyoruz
          </h2>

          <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
            <p className="text-lg">
              i-novaria, Ankara merkezli bir dijital dönüşüm ve yapay zekâ otomasyon danışmanlık firmasıdır.{" "}
              <strong className="font-semibold text-ink">n8n, Claude AI, Gemini API ve OpenAI API</strong> kullanarak
              işletmelerin tekrar eden süreçlerini otomatize ediyoruz.
            </p>
            <p>
              Vibe Coding yaklaşımıyla web uygulamaları ve mobil oyunlar geliştiriyor; CRM entegrasyonundan e-posta
              otomasyonuna, belge işlemeden veri analitiğine kadar uçtan uca AI çözümleri sunuyoruz.
            </p>
            <p>
              Büyük kurumsal yazılımlar yerine işletmenize özel, ölçeklenebilir otomasyon sistemleri kuruyoruz. Önerdiğimiz
              her yöntemi önce{" "}
              <a href="#urunler" className="font-semibold text-ink underline underline-offset-2">
                kendi ürünlerimizde
              </a>{" "}
              deniyoruz.
            </p>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-faint">
            <MapPin className="h-4 w-4" aria-hidden />
            Ankara, Türkiye
          </p>
        </div>

        <div className="space-y-10">
          <div>
            <h3 className="section-label mb-3">Kullandığımız teknolojiler</h3>
            <ul className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li key={tech.name} className="tag tag-on-ground !px-3 !py-1.5 !text-sm">
                  <span className="font-semibold text-ink">{tech.name}</span>
                  <span className="text-faint">· {tech.description}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-label mb-3">Uzmanlık alanlarımız</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {focusAreas.map((area) => (
                <div key={area.title} className="rounded-[14px] border border-line bg-surface p-5">
                  <area.icon className="mb-3 h-5 w-5 text-brand" aria-hidden />
                  <p className="font-semibold text-ink">{area.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
