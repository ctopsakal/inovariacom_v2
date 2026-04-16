import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Linkedin, 
  Twitter, 
  Mail,
  ExternalLink
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-card border-t border-card-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4" data-testid="footer-logo">
              <img src="/logo.png" alt="i-novaria logo" className="w-8 h-8 rounded-md" />
              <span className="text-xl font-bold text-foreground">i-novaria</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4" data-testid="text-footer-description">
              Vibe coding, web sitesi tasarımı, e-ticaret ve mobil oyun geliştirme alanlarında 
              freelance yazılım & dijital çözümler sunuyorum.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.linkedin.com/company/i-novaria/?viewAsMember=true" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-testid="link-linkedin">
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:info@i-novaria.com" aria-label="Email" data-testid="link-email">
                  <Mail className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="text-footer-services-heading">Hizmetler</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground text-sm"
                  data-testid="footer-vibe-coding"
                >
                  Vibe Coding
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground text-sm"
                  data-testid="footer-digital"
                >
                  Dijital Dönüşüm Danışmanlığı
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground text-sm"
                  data-testid="footer-web"
                >
                  Web Sitesi Tasarımı
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground text-sm"
                  data-testid="footer-ecommerce"
                >
                  E-Ticaret Sistemi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("services")}
                  className="text-muted-foreground text-sm"
                  data-testid="footer-mobile"
                >
                  Mobil Oyun Geliştirme
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="text-footer-projects-heading">Projeler</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground text-sm" data-testid="text-project-nodelinq"><a href="https://play.google.com/store/apps/details?id=com.innovaria.wordmap" target="_blank" aria-label="wordduel" data-testid="link-wordduel">Word Duel: Claim the Grid (Mobil Oyun)</a></span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm" data-testid="text-project-wordmap"><a href="https://play.google.com/store/apps/details?id=com.ctopsakal.echopath" target="_blank" aria-label="echopath" data-testid="link-echopath">EchoPath: Mind's Echo(Mobil Oyun)</a></span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm" data-testid="text-project-nodelinq">NodeLinq (Yakında)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4" data-testid="text-footer-contact-heading">İletişim</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-muted-foreground text-sm"
                  data-testid="footer-contact"
                >
                  Bize Ulaşın
                </button>
              </li>
              <li>
                <a href="mailto:info@i-novaria.com" className="text-muted-foreground text-sm" data-testid="footer-email">
                  info@i-novaria.com
                </a>
              </li>
              <li>
                <span className="text-muted-foreground text-sm" data-testid="footer-location">Ankara, Türkiye</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            {currentYear} i-novaria. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" data-testid="link-privacy">Gizlilik Politikası</span>
            <span className="text-sm text-muted-foreground" data-testid="link-terms">Kullanım Şartları</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
