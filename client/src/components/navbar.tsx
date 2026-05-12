import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleLogoClick = () => {
    if (location === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" onClick={handleLogoClick} data-testid="logo-container" className="inline-flex">
            <img
              src="/logo.png"
              alt="i-novaria logo"
              className="w-16 h-16 -mt-2 cursor-pointer rounded-lg opacity-100 hover:opacity-70 hover:scale-110 transition-all duration-200"
            />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href={location === "/" ? undefined : "/?section=services"}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => location === "/" && scrollToSection("services")}
                data-testid="nav-services"
              >
                Hizmetler
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => location === "/" ? scrollToSection("about") : window.location.href = "/?section=about"}
              data-testid="nav-about"
            >
              Hakkımızda
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => location === "/" ? scrollToSection("contact") : window.location.href = "/?section=contact"}
              data-testid="nav-contact"
            >
              İletişim
            </Button>
            <Link href="/blog">
              <Button
                variant={location.startsWith("/blog") ? "secondary" : "ghost"}
                size="sm"
                data-testid="nav-blog"
              >
                Blog
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link href={location === "/" ? undefined : "/?section=contact"}>
              <Button
                onClick={() => location === "/" && scrollToSection("contact")}
                data-testid="nav-cta"
              >
                Proje Konuşalım
              </Button>
            </Link>
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
            <Link href={location === "/" ? undefined : "/?section=services"}>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  if (location === "/") scrollToSection("services");
                  setIsMenuOpen(false);
                }}
                data-testid="nav-mobile-services"
              >
                Hizmetler
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                if (location === "/") {
                  scrollToSection("about");
                } else {
                  window.location.href = "/?section=about";
                }
                setIsMenuOpen(false);
              }}
              data-testid="nav-mobile-about"
            >
              Hakkımızda
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                if (location === "/") {
                  scrollToSection("contact");
                } else {
                  window.location.href = "/?section=contact";
                }
                setIsMenuOpen(false);
              }}
              data-testid="nav-mobile-contact"
            >
              İletişim
            </Button>
            <Link href="/blog">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setIsMenuOpen(false)}
                data-testid="nav-mobile-blog"
              >
                Blog
              </Button>
            </Link>
            <Link href={location === "/" ? undefined : "/?section=contact"} className="w-full">
              <Button
                className="w-full mt-4"
                onClick={() => {
                  if (location === "/") scrollToSection("contact");
                  setIsMenuOpen(false);
                }}
                data-testid="nav-mobile-cta"
              >
                Proje Konuşalım
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
