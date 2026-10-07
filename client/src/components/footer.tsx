import { Link, useLocation } from "wouter";
import { Linkedin, Mail } from "lucide-react";
import { PRODUCTS } from "@/lib/products";

const serviceLinks = [
  "Vibe Coding",
  "Dijital Dönüşüm Danışmanlığı",
  "Web Sitesi Tasarımı",
  "E-Ticaret Sistemi",
  "Mobil Oyun Geliştirme",
];

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [location] = useLocation();

  const goToSection = (id: string) => {
    if (location !== "/") {
      window.location.href = `/?section=${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const linkClass = "text-ink-soft hover:text-ink transition-colors text-left";

  return (
    <footer className="mt-12 border-t border-line">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2" data-testid="footer-logo">
              <span className="h-9 w-9 overflow-hidden rounded-lg border border-line bg-white">
                <img src="/logo.png" alt="" className="h-full w-full scale-[1.9] object-contain" />
              </span>
              <span className="font-display text-xl text-ink">i-novaria</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-ink-soft" data-testid="text-footer-description">
              Yapay zekâ otomasyonu, Vibe Coding, web, e-ticaret ve mobil oyun geliştirme. Kendi ürünlerimizi de
              geliştirip işletiyoruz.
            </p>
            <div className="flex items-center gap-1">
              <a
                href="https://www.linkedin.com/company/i-novaria/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink"
                data-testid="link-linkedin"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:info@i-novaria.com"
                aria-label="E-posta"
                className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:bg-surface hover:text-ink"
                data-testid="link-email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="section-label mb-4" data-testid="text-footer-services-heading">Hizmetler</h3>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <button onClick={() => goToSection("services")} className={linkClass}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="section-label mb-4" data-testid="text-footer-projects-heading">Ürünler</h3>
            <ul className="space-y-2 text-sm">
              {PRODUCTS.map((p) => (
                <li key={p.name}>
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {p.name} <span className="text-faint">· {p.kind}</span>
                  </a>
                </li>
              ))}
              <li className="text-faint">NodeLinq · yakında</li>
            </ul>
          </div>

          <div>
            <h3 className="section-label mb-4" data-testid="text-footer-contact-heading">İletişim</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => goToSection("contact")} className={linkClass} data-testid="footer-contact">
                  Bize ulaşın
                </button>
              </li>
              <li>
                <a href="mailto:info@i-novaria.com" className={linkClass} data-testid="footer-email">
                  info@i-novaria.com
                </a>
              </li>
              <li>
                <Link href="/blog" className={linkClass}>
                  Blog
                </Link>
              </li>
              <li className="text-faint" data-testid="footer-location">
                Ankara, Türkiye
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-sm text-faint">
          <p data-testid="text-copyright">© {currentYear} i-novaria. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
