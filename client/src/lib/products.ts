// Products i-novaria built and runs itself. The hero card stack and the products section share this list.
export type Product = {
  name: string;
  kind: string;
  tagline: string;
  url: string;
  host: string;
  tags: string[];
  logo?: string;
  initial?: string;
  // "spot" uses Konuşmacım's own stage-light yellow on its card.
  tone: "spot" | "brand" | "plain";
};

export const KONUSMACIM: Product = {
  name: "Konuşmacım",
  kind: "Web uygulaması",
  tagline: "Türkiye'deki etkinlik konuşmacılarının ücretsiz dizini. Organizatör konuşmacıyı bulur, doğrudan davet eder.",
  url: "https://www.konusmacim.com",
  host: "konusmacim.com",
  tags: ["Next.js", "PostgreSQL", "Claude AI"],
  logo: "/konusmacim-logo.png",
  tone: "spot",
};

export const GAMES: Product[] = [
  {
    name: "WordDuel",
    kind: "Mobil oyun",
    tagline: "Kelime bilgisiyle ızgara stratejisini birleştiren düello: gizli kelimeleri bul, kareleri ele geçir.",
    url: "https://play.google.com/store/apps/details?id=com.innovaria.wordmap",
    host: "Google Play",
    tags: ["React Native", "Gerçek zamanlı"],
    initial: "W",
    tone: "brand",
  },
  {
    name: "Echo Path",
    kind: "Mobil oyun",
    tagline: "Minimalist hafıza bulmacası: ışığın izlediği yolu ezberle, aynı sırayla çiz. Her gün yeni bir rota.",
    url: "https://play.google.com/store/apps/details?id=com.ctopsakal.echopath",
    host: "Google Play",
    tags: ["React Native", "Günlük bulmaca"],
    initial: "E",
    tone: "plain",
  },
];

export const PRODUCTS: Product[] = [KONUSMACIM, ...GAMES];
