// components/WishlistDrawer.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getWishlist, setWishlist, wishlistCount } from "@/lib/wishlistStorage";
import { formatXOF } from "@/lib/money";

function IconClose(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function WishlistDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [items, setItems] = useState(getWishlist());

  const wineText = "text-[hsl(var(--be-wine))]";
  const wineLine = "border-[hsla(var(--be-wine),0.25)]";
  const roseBg = "bg-[hsl(var(--be-rose-bg))]";

  useEffect(() => {
    const refresh = () => setItems(getWishlist());
    refresh();
    window.addEventListener("wishlist:changed", refresh);
    return () => window.removeEventListener("wishlist:changed", refresh);
  }, []);

  // Ouvrir depuis n'importe où (ex: page produit)
  useEffect(() => {
    const onOpen = () => {
      // le parent (Header) gère l'état open; ici on ne peut pas l'ouvrir directement,
      // donc on ne fait rien (c'est le Header qui doit écouter wishlist:open).
      // On garde juste ce hook si tu veux plus tard.
    };
    window.addEventListener("wishlist:open", onOpen as any);
    return () => window.removeEventListener("wishlist:open", onOpen as any);
  }, []);

  const count = useMemo(() => wishlistCount(), [items]);

  function remove(id: string) {
    const next = items.filter((x) => x.id !== id);
    setWishlist(next); // dispatch wishlist:changed
  }

  return (
    <div className={open ? "fixed inset-0 z-[70]" : "hidden"} aria-hidden={!open}>
      {/* overlay */}
      <button 
        className="absolute inset-0 bg-black/35" 
        onClick={onClose} 
        aria-label="Fermer" 
      />

      {/* panel */}
      <aside
        className={[
          "absolute right-0 top-0 h-full w-full max-w-[380px] md:max-w-[420px]",
          roseBg,
          "soft-shadow border-l",
          wineLine,
        ].join(" ")}
      >
        {/* top bar */}
        <div className={["h-16 px-6 flex items-center justify-end border-b", wineLine].join(" ")}>
          <button
            onClick={onClose}
            aria-label="Close"
            className={[wineText, "p-2 hover:opacity-80 transition"].join(" ")}
          >
            <IconClose className="h-6 w-6" />
          </button>
        </div>

        {/* list */}
        <div className="overflow-auto h-[calc(100%-64px-124px)]">
          {items.length === 0 ? (
            <div className="py-20 text-center px-8">
              <p className={["text-sm", wineText, "opacity-70"].join(" ")}>
                Ta wishlist est vide.
              </p>
              <Link
                href="/shop"
                onClick={onClose}
                className={[
                  "mt-6 inline-flex items-center justify-center w-full py-4 text-sm tracking-[0.16em] uppercase",
                  "bg-[hsl(var(--be-wine))] text-white",
                ].join(" ")}
              >
                Explorer la boutique
              </Link>
            </div>
          ) : (
            <div className={["divide-y", wineLine].join(" ")}>
              {items.map((it) => (
                <div key={it.id} className="px-6 py-8">
                  <div className="grid grid-cols-[140px_1fr] gap-4">
                    {/* image carrée, plus grande, sans arrondi */}
                    <div className={["w-[140px] h-[180px] bg-white/40 border", wineLine].join(" ")}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={it.image}
                        alt={it.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* texte */}
                    <div className="min-w-0">
                      <p className={["font-serif italic text-[15px] leading-snug", wineText].join(" ")}>
                        {it.title}
                      </p>

                      <p className={["mt-4 text-[14px] tracking-[0.14em] uppercase", wineText].join(" ")}>
                        {formatXOF(it.price)}
                      </p>

                      <p className={["mt-2 text-xs", wineText, "opacity-70"].join(" ")}>
                        Be Cute
                      </p>

                      {/* actions */}
                      <div className={["mt-8 pt-4 flex items-center justify-between border-t", wineLine].join(" ")}>
                        <Link
                          href={`/product/${it.slug}`}
                          onClick={onClose}
                          className={[
                            "text-[10px] tracking-[0.14em] uppercase",
                            wineText,
                            "hover:opacity-80 transition",
                          ].join(" ")}
                        >
                          Voir le produit
                        </Link>

                        <button
                          type="button"
                          onClick={() => remove(it.id)}
                          className={[
                            "text-[10px] tracking-[0.14em] uppercase",
                            wineText,
                            "hover:opacity-80 transition",
                          ].join(" ")}
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* bottom summary */}
        <div className={["p-6 border-t", wineLine].join(" ")}>
          <div className="flex items-center justify-between text-sm">
            <span className={[wineText, "text-[14px]"].join(" ")}>Articles</span>
            <span className={[wineText, "text-[14px] font-semibold"].join(" ")}>{count}</span>
          </div>

          <Link
            href="/shop"
            onClick={onClose}
            className={[
              "mt-6 w-full inline-flex items-center justify-center py-3",
              "text-white bg-[hsl(var(--be-wine))]",
              "text-[14px] tracking-[0.18em] uppercase",
              items.length === 0 ? "pointer-events-none opacity-40" : "hover:opacity-95 transition",
            ].join(" ")}
          >
            Continuer mes achats
          </Link>

          <p className={["mt-4 text-xs", wineText, "opacity-70"].join(" ")}>
            Astuce : ajoute des pièces pour les retrouver en 1 clic.
          </p>
        </div>
      </aside>
    </div>
  );
}