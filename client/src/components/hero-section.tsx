import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Code2, Sparkles, Smartphone, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 via-background to-indigo-600/10" />
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-violet-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6"
          >
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium" data-testid="badge-hero">
              <Code2 className="w-4 h-4 mr-2" />
              Freelance Yazılım & Dijital Çözümler
            </Badge>
            <Badge className="px-4 py-2 text-sm font-medium bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0" data-testid="badge-vibe">
              <Sparkles className="w-4 h-4 mr-2" />
              Vibe Coding Uzmanı
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
            data-testid="text-hero-heading"
          >
            Fikirleri
            <br />
            <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Dijital Ürünlere
            </span>
            <br />
            Dönüştürüyorum
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            data-testid="text-hero-description"
          >
            i-novaria olarak <strong>web sitesi, e-ticaret, mobil oyun ve dijital dönüşüm danışmanlığı</strong> alanlarında
            uçtan uca çözümler sunuyorum. Vibe coding yaklaşımıyla hızlı, modern ve etkili ürünler geliştiriyorum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="px-8"
              data-testid="hero-cta-contact"
            >
              Proje Konuşalım
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("services")}
              className="px-8"
              data-testid="hero-cta-services"
            >
              <Zap className="mr-2 h-5 w-5" />
              Hizmetleri Gör
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 border border-card-border" data-testid="stat-projects">
              <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center">
                <Code2 className="w-5 h-5 text-violet-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground" data-testid="text-stat-projects-value">100+</p>
                <p className="text-sm text-muted-foreground" data-testid="text-stat-projects-label">Tamamlanan Proje</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 border border-card-border" data-testid="stat-mobile">
              <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground" data-testid="text-stat-mobile-value">React Native</p>
                <p className="text-sm text-muted-foreground" data-testid="text-stat-mobile-label">Mobil Oyun Geliştirme</p>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 rounded-lg bg-card/50 border border-card-border" data-testid="stat-web">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold text-foreground" data-testid="text-stat-web-value">Full-Stack</p>
                <p className="text-sm text-muted-foreground" data-testid="text-stat-web-label">Web & E-Ticaret</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
}
