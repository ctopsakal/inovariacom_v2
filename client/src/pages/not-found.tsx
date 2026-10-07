import { Link } from "wouter";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-36 pb-24">
        <p className="section-label">404</p>
        <h1 className="font-display mt-3 text-4xl text-ink sm:text-5xl">Bu sayfa bulunamadı</h1>
        <p className="mt-4 max-w-md text-ink-soft">Aradığınız sayfa taşınmış ya da hiç var olmamış olabilir.</p>
        <Link href="/" className="btn btn-primary mt-8">
          Ana sayfaya dön
        </Link>
      </main>
    </div>
  );
}
