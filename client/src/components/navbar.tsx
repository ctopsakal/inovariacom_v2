import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center gap-2" data-testid="logo-container">
            <img src="/logo.png" alt="i-novaria logo" className="w-8 h-8 rounded-md" />
            <span className="text-xl font-bold text-foreground" data-testid="text-logo">i-novaria</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("services")}
              data-testid="nav-services"
            >
              Hizmetler
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("projects")}
              data-testid="nav-projects"
            >
              Projeler
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("about")}
              data-testid="nav-about"
            >
              Hakkımda
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => scrollToSection("contact")}
              data-testid="nav-contact"
            >
              İletişim
            </Button>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Button
              onClick={() => scrollToSection("contact")}
              data-testid="nav-cta"
            >
              Proje Konuşalım
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="nav-mobile-toggle"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-4 py-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("services")}
              data-testid="nav-mobile-services"
            >
              Hizmetler
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("projects")}
              data-testid="nav-mobile-projects"
            >
              Projeler
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("about")}
              data-testid="nav-mobile-about"
            >
              Hakkımda
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => scrollToSection("contact")}
              data-testid="nav-mobile-contact"
            >
              İletişim
            </Button>
            <Button
              className="w-full mt-4"
              onClick={() => scrollToSection("contact")}
              data-testid="nav-mobile-cta"
            >
              Proje Konuşalım
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
