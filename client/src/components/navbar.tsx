import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "urunler", label: "Ürünler" },
  { id: "services", label: "Hizmetler" },
  { id: "about", label: "Hakkımızda" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  // On the home page scroll in place; elsewhere go home and let it scroll to ?section=.
  const goToSection = (id: string) => {
    setIsMenuOpen(false);
    if (location !== "/") {
      window.location.href = `/?section=${id}`;
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    if (location === "/") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const linkClass = "text-ink-soft hover:text-ink transition-colors";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-ground/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" onClick={handleLogoClick} data-testid="logo-container" className="flex shrink-0 items-center gap-2">
          {/* The logo PNG has a white canvas with wide margins: crop it into a white tile that reads in both themes. */}
          <span className="h-10 w-10 overflow-hidden rounded-lg border border-line bg-white">
            <img src="/logo.png" alt="" className="h-full w-full scale-[1.9] object-contain" />
          </span>
          <span className="font-display text-xl leading-none text-ink">i-novaria</span>
        </Link>

        <nav className="hidden items-center gap-6 text-[0.95rem] md:flex" aria-label="Ana menü">
          {sections.map((s) => (
            <button key={s.id} onClick={() => goToSection(s.id)} className={linkClass} data-testid={`nav-${s.id}`}>
              {s.label}
            </button>
          ))}
          <Link
            href="/blog"
            className={location.startsWith("/blog") ? "font-semibold text-ink" : linkClass}
            data-testid="nav-blog"
          >
            Blog
          </Link>
          <button onClick={() => goToSection("contact")} className="btn btn-primary !py-2 !text-sm" data-testid="nav-cta">
            Proje konuşalım
          </button>
        </nav>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-ink md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={isMenuOpen}
          data-testid="nav-mobile-toggle"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="border-t border-line bg-ground px-4 pb-5 pt-2 md:hidden" aria-label="Mobil menü">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => goToSection(s.id)}
              className="block w-full border-b border-line py-3 text-left font-medium text-ink"
              data-testid={`nav-mobile-${s.id}`}
            >
              {s.label}
            </button>
          ))}
          <Link
            href="/blog"
            onClick={() => setIsMenuOpen(false)}
            className="block w-full border-b border-line py-3 font-medium text-ink"
            data-testid="nav-mobile-blog"
          >
            Blog
          </Link>
          <button onClick={() => goToSection("contact")} className="btn btn-primary mt-4 w-full" data-testid="nav-mobile-cta">
            Proje konuşalım
          </button>
        </nav>
      )}
    </header>
  );
}
