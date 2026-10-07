import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/lib/products";

const toneClass: Record<Product["tone"], string> = {
  spot: "badge-spot",
  brand: "badge-brand",
  plain: "",
};

/** A product shown as an event lanyard badge, the card style Konuşmacım uses for speakers. */
export function ProductBadgeBody({ product }: { product: Product }) {
  return (
    <>
      <span className="badge-slot" aria-hidden />
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <div className="flex items-center gap-3">
          {product.logo ? (
            <img src={product.logo} alt="" className="h-14 w-14 rounded-xl bg-ground object-contain p-1.5" />
          ) : (
            <span className="font-display grid h-14 w-14 place-items-center rounded-xl bg-brand-soft text-2xl text-brand">
              {product.initial}
            </span>
          )}
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">{product.kind}</p>
            <p className="font-display truncate text-2xl leading-tight text-ink">{product.name}</p>
          </div>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{product.tagline}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {product.tags.map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
        </div>
      </div>
      <div className="badge-ribbon">
        <span>Yayında</span>
        <span className="inline-flex items-center gap-1">
          {product.host}
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </div>
    </>
  );
}

export function badgeClass(product: Product) {
  return `badge-card ${toneClass[product.tone]}`;
}
