// components/CartDrawer.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getCart, removeFromCart, updateCartQty, cartTotal } from "@/lib/shopStorage";
import { formatXOF } from "@/lib/money";

function IconClose(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function CartDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [items, setItems] = useState(getCart());

  const wineText = "text-[hsl(var(--be-wine))]";
  const wineLine = "border-[hsla(var(--be-wine),0.25)]";
  const roseBg = "bg-[hsl(var(--be-rose-bg))]";

  useEffect(() => {
    const refresh = () => setItems(getCart());
    refresh();
    window.addEventListener("cart:changed", refresh);
    return () => window.removeEventListener("cart:changed", refresh);
  }, []);

  const total = useMemo(() => cartTotal(), [items]);

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
        <div className="overflow-auto h-[calc(100%-64px-190px)]">
          {items.length === 0 ? (
            <div className="py-20 text-center px-8">
              <p className={["text-sm", wineText, "opacity-70"].join(" ")}>Ton panier est vide.</p>
              <Link
                href="/shop"
                onClick={onClose}
                className={[
                  "mt-6 inline-flex items-center justify-center w-full py-4 text-sm tracking-[0.16em] uppercase",
                  "bg-[hsl(var(--be-wine))] text-white",
                ].join(" ")}
              >
                Explorer
              </Link>
            </div>
          ) : (
            <div className={["divide-y", wineLine].join(" ")}>
              {items.map((it) => (
                <div key={`${it.id}:${it.size || ""}`} className="px-6 py-8">
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

                      <div className="mt-6 space-y-2">
                        <p className={["text-[13px]", wineText].join(" ")}>
                          Size : {it.size ? it.size : "—"}
                        </p>

                        <div className="flex items-center gap-4">
                          <p className={["text-[13px]", wineText].join(" ")}>Quantité:</p>

                          <div className="flex items-center gap-4">
                            <button
                              type="button"
                              onClick={() => updateCartQty(it.id, it.size, Math.max(1, it.qty - 1))}
                              className={[wineText, "text-[15px] leading-none hover:opacity-80 transition"].join(" ")}
                              aria-label="Diminuer"
                            >
                              −
                            </button>

                            <span className={[wineText, "text-[13px]"].join(" ")}>{it.qty}</span>

                            <button
                              type="button"
                              onClick={() => updateCartQty(it.id, it.size, Math.min(9, it.qty + 1))}
                              className={[wineText, "text-[15px] leading-none hover:opacity-80 transition"].join(" ")}
                              aria-label="Augmenter"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* actions bas comme sur ton screen */}
                      <div className={["mt-8 pt-4 flex items-center justify-between border-t", wineLine].join(" ")}>
                        <button
                          type="button"
                          className={[
                            "text-[10px] tracking-[0.14em] uppercase",
                            wineText,
                            "hover:opacity-80 transition",
                          ].join(" ")}
                          // à brancher plus tard si tu fais une wishlist
                          onClick={() => {}}
                        >
                          Ajouter à la wishlist
                        </button>

                        <button
                          type="button"
                          onClick={() => removeFromCart(it.id, it.size)}
                          className={[
                            "text-[10px] tracking-[0.14em] uppercase",
                            wineText,
                            "hover:opacity-80 transition",
                          ].join(" ")}
                        >
                          Enlever
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
        <div className={["p-3 border-t", wineLine].join(" ")}>
          <div className="space-y-2">

            <div className="flex items-center justify-between">
              <span className={[wineText, "text-[14px]"].join(" ")}>Frais de port estimés</span>
              <span className={[wineText, "text-[14px] font-semibold"].join(" ")}>{formatXOF(0)}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className={[wineText, "text-[14px]"].join(" ")}>Total estimé</span>
              <span className={[wineText, "text-[14px] font-semibold"].join(" ")}>{formatXOF(total)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            onClick={onClose}
            className={[
              "mt-6 mb-16 w-full inline-flex items-center justify-center py-3",
              "text-white bg-[hsl(var(--be-wine))]",
              "text-[14px] tracking-[0.18em] uppercase",
              items.length === 0 ? "pointer-events-none opacity-40" : "hover:opacity-95 transition",
            ].join(" ")}
          >
            Checkout ({items.length})
          </Link>
        </div>
      </aside>
    </div>
  );
}
