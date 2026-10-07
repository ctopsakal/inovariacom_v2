import { useEffect, useRef, useState } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductBadgeBody, badgeClass } from "@/components/product-badge";

// Resting pose by depth (0 = front card), as in Konuşmacım's hero stack.
const POSES = [
  { x: 50, y: 95, rot: -2, scale: 1 },
  { x: 110, y: 0, rot: 8, scale: 0.94 },
  { x: 0, y: 30, rot: -9, scale: 0.94 },
];
const THROW_PX = 90; // drag distance that sends the card to the back
const CLICK_PX = 5; // below this a pointer gesture counts as a click
const FLY_MS = 280;
const AUTO_MS = 4500; // auto-advance interval while nobody is interacting

/**
 * Swipeable stack of product badges: drag (or arrow keys) to cycle, click to open the product.
 * Advances on its own every few seconds unless hovered, focused, dragged, hidden or reduced motion is on.
 */
export function ProductStack() {
  const [order, setOrder] = useState(() => PRODUCTS.map((_, i) => i));
  const [drag, setDrag] = useState<{ dx: number; dy: number } | null>(null);
  const [flying, setFlying] = useState<1 | -1 | null>(null);
  const [paused, setPaused] = useState(false);
  const start = useRef<{ x: number; y: number } | null>(null);
  const dragged = useRef(false); // swallows the click that ends a drag
  const groupRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const cycle = (dir: 1 | -1) => {
    if (flying) return;
    setFlying(dir);
    setTimeout(() => {
      setOrder((o) => (dir === 1 ? [...o.slice(1), o[0]] : [o[o.length - 1], ...o.slice(0, -1)]));
      setFlying(null);
    }, FLY_MS);
  };

  // Restarts whenever the order changes, so a manual swipe also resets the countdown.
  useEffect(() => {
    if (paused || drag) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => {
      if (!document.hidden) cycle(1);
    }, AUTO_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order, paused, drag]);

  // Keyboard users keep focus on whichever card is now in front.
  useEffect(() => {
    if (groupRef.current?.contains(document.activeElement)) cardRefs.current[order[0]]?.focus();
  }, [order]);

  const onPointerDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (flying || (e.pointerType === "mouse" && e.button !== 0)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    start.current = { x: e.clientX, y: e.clientY };
    dragged.current = false;
    setDrag({ dx: 0, dy: 0 });
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!start.current) return;
    const dx = e.clientX - start.current.x;
    const dy = e.clientY - start.current.y;
    if (Math.hypot(dx, dy) >= CLICK_PX) dragged.current = true;
    setDrag({ dx, dy });
  };
  const endDrag = () => {
    if (!start.current || !drag) return;
    const { dx } = drag;
    start.current = null;
    setDrag(null);
    if (Math.abs(dx) > THROW_PX) cycle(dx > 0 ? 1 : -1);
  };

  return (
    <div
      ref={groupRef}
      className="relative h-[440px] w-[380px] select-none"
      role="group"
      aria-roledescription="kart destesi"
      aria-label="Kendi ürünlerimiz"
      // Mouse only: on touch screens a tap would leave the stack "hovered" and stop auto-advance for good.
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      {/* Cards stay in DOM order (so focus and links are stable); depth only changes pose and z-index. */}
      {PRODUCTS.map((p, productIndex) => {
        const depth = order.indexOf(productIndex);
        const pose = POSES[depth];
        const front = depth === 0;
        let { x, y, rot } = pose;
        let opacity = 1;
        if (front && drag) {
          x += drag.dx;
          y += drag.dy * 0.3;
          rot += drag.dx / 15;
        }
        if (front && flying) {
          x += flying * 520;
          rot += flying * 25;
          opacity = 0;
        }
        return (
          <a
            key={p.name}
            ref={(el) => {
              cardRefs.current[productIndex] = el;
            }}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            tabIndex={front ? 0 : -1}
            aria-hidden={front ? undefined : true}
            aria-label={
              front ? `${p.name} (${p.kind}), yeni sekmede açılır. Sağ ve sol ok tuşlarıyla diğer ürünlere geç.` : undefined
            }
            className={`${badgeClass(p)} absolute left-0 top-0 w-[270px] shadow-xl ${
              front ? "cursor-grab active:cursor-grabbing hover:border-ink" : "pointer-events-none"
            }`}
            style={{
              transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${pose.scale})`,
              opacity,
              zIndex: PRODUCTS.length - depth,
              transition: front && drag ? "none" : `transform ${FLY_MS}ms ease, opacity ${FLY_MS}ms ease`,
              touchAction: front ? "pan-y" : undefined,
            }}
            onDragStart={(e) => e.preventDefault()}
            onClick={(e) => {
              if (dragged.current) {
                e.preventDefault();
                dragged.current = false;
              }
            }}
            {...(front && {
              onPointerDown,
              onPointerMove,
              onPointerUp: endDrag,
              onPointerCancel: () => {
                start.current = null;
                setDrag(null);
              },
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "ArrowRight") cycle(1);
                else if (e.key === "ArrowLeft") cycle(-1);
              },
            })}
            data-testid={`hero-product-${productIndex}`}
          >
            <ProductBadgeBody product={p} />
          </a>
        );
      })}

      <p className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-faint">
        ← Kartı kaydır →
      </p>
    </div>
  );
}
