import { ProductStack } from "@/components/product-stack";

const stats = [
  { value: "100+", label: "tamamlanan proje" },
  { value: "3", label: "kendi ürünümüz yayında" },
  { value: "Ankara", label: "merkezli stüdyo" },
];

export function HeroSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-14 pt-28 sm:pt-36 lg:grid-cols-[minmax(0,1fr)_380px] lg:pb-20">
      <div>
        <p className="eyebrow" data-testid="badge-hero">
          <span className="h-2 w-2 rounded-full bg-brand" aria-hidden />
          AI otomasyon & Vibe Coding stüdyosu
        </p>
        <h1
          className="font-display mt-5 max-w-[16ch] text-[2.5rem] leading-[1.04] text-ink sm:text-[3.75rem] lg:text-[4.25rem]"
          data-testid="text-hero-heading"
        >
          Fikirleri çalışan <span className="marker">ürünlere</span> dönüştürüyoruz
        </h1>
        <p className="mt-5 max-w-[36rem] text-base leading-relaxed text-ink-soft sm:text-lg" data-testid="text-hero-description">
          <strong className="font-semibold text-ink">n8n, Claude AI, Gemini ve OpenAI API</strong> ile iş süreçlerinizi
          uçtan uca otomatize ediyoruz. Vibe Coding yaklaşımıyla web, e-ticaret ve mobil projeleri haftalar içinde
          yayına alıyoruz. Aynı yöntemle kendi ürünlerimizi de geliştirip işletiyoruz.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <button onClick={() => scrollToSection("contact")} className="btn btn-primary" data-testid="hero-cta-contact">
            Proje konuşalım
          </button>
          <button onClick={() => scrollToSection("urunler")} className="btn btn-ghost" data-testid="hero-cta-products">
            Ürünlerimizi gör
          </button>
        </div>

        <dl className="mt-10 grid max-w-[36rem] grid-cols-3 border-t border-line pt-5">
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl tabular-nums text-ink sm:text-3xl">{s.value}</dd>
              <dd className="mt-1 text-xs leading-snug text-faint sm:text-sm">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* On phones the 380px stack is scaled down so the page never gets wider than the screen. */}
      <div className="mx-auto h-[380px] w-[327px] sm:h-[440px] sm:w-[380px] lg:mx-0">
        <div className="w-[380px] origin-top-left scale-[0.86] sm:scale-100">
          <ProductStack />
        </div>
      </div>
    </section>
  );
}
