import { ArrowUpRight } from "lucide-react";
import { GAMES, KONUSMACIM } from "@/lib/products";

const konusmacimSteps = [
  {
    title: "Konuşmacı kendi onayıyla listelenir",
    text: "Başvurur ya da davetimizi kabul eder. Profili onaylanınca yayına girer, istediği an düzenler.",
  },
  {
    title: "Organizatör konuya, şehre, formata göre bulur",
    text: "Konuşma başlıkları, videolar ve daha önce sahneye çıktığı etkinlikler tek profilde.",
  },
  {
    title: "Doğrudan davet, aracı yok",
    text: "Davet konuşmacının e-postasına gider. Komisyon ya da ücret alınmaz.",
  },
];

const konusmacimBuilt = [
  "Next.js 16 + PostgreSQL",
  "Onaylı düzenleme akışı",
  "KVKK uyumlu açık rıza",
  "E-posta + Telegram bildirimleri",
];

export function ProductsSection() {
  return (
    <section id="urunler" className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="mb-8 flex flex-col gap-3 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-display text-3xl leading-none text-ink sm:text-4xl" data-testid="text-products-heading">
          Kendi ürünlerimiz
        </h2>
        <p className="max-w-md text-sm text-faint sm:text-right">
          Müşterilerimize önerdiğimiz yöntemle geliştirip kendimiz işlettiğimiz ürünler.
        </p>
      </div>

      {/* Konuşmacım, the flagship */}
      <article className="overflow-hidden rounded-[14px] border border-line bg-surface" data-testid="card-konusmacim">
        <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)]">
          <div>
            <div className="flex items-center gap-4">
              <img src={KONUSMACIM.logo} alt="" className="h-16 w-16 rounded-2xl bg-ground object-contain p-2" />
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft">
                  <span className="h-2 w-2 rounded-full bg-spot" aria-hidden />
                  Yayında · {KONUSMACIM.kind}
                </p>
                <h3 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{KONUSMACIM.name}</h3>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
              Türkiye'deki etkinlik konuşmacılarını listeleyen <strong className="font-semibold text-ink">ücretsiz</strong>{" "}
              dizin. Konferans, meetup ya da şirket içi eğitim için konuşmacı arayan organizatör, sahne deneyimli
              isimleri bulur ve doğrudan davet eder.
            </p>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {konusmacimBuilt.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={KONUSMACIM.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                data-testid="link-konusmacim"
              >
                konusmacim.com'u ziyaret et
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={`${KONUSMACIM.url}/apply`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
                data-testid="link-konusmacim-apply"
              >
                Konuşmacı ol
              </a>
            </div>
          </div>

          <ol className="self-center border-t border-line">
            {konusmacimSteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2 border-b border-line py-5">
                <span className="font-display text-lg tabular-nums text-faint">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="font-semibold text-ink">{s.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </article>

      {/* Mobile games */}
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        {GAMES.map((g) => (
          <a
            key={g.name}
            href={g.url}
            target="_blank"
            rel="noopener noreferrer"
            className="panel-link group flex gap-4 rounded-[14px] border border-line bg-surface p-5 sm:p-6"
            data-testid={`link-game-${g.initial}`}
          >
            <span className="font-display grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-brand-soft text-2xl text-brand">
              {g.initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium uppercase tracking-wider text-faint">{g.kind} · Android</p>
              <h3 className="font-display mt-0.5 flex items-center gap-1.5 text-xl text-ink">
                {g.name}
                <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-ink" aria-hidden />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{g.tagline}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {g.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
