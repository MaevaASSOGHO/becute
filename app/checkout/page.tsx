// app/checkout/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getCart, cartTotal, clearCart } from "@/lib/shopStorage";
import { formatXOF } from "@/lib/money";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const [items, setItems] = useState(getCart());
  const total = useMemo(() => cartTotal(), [items]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const refresh = () => setItems(getCart());
    window.addEventListener("cart:changed", refresh);
    return () => window.removeEventListener("cart:changed", refresh);
  }, []);

  function confirmOrder(e: React.FormEvent) {
    e.preventDefault();
    setDone(true);
    clearCart();
  }

  if (done) {
    return (
      <div className="py-35 mt-7 bg-[hsl(var(--be-rose-bg))]">
        <Header />
        <p className="text-xs tracking-[0.2em] mx-5 md:mx-9 text-black/55">BE CUTE</p>
        <h1 className="mt-2 text-3xl md:text-4xl mx-5 md:mx-9 font-semibold">Merci ✨</h1>
        <p className="mt-3 text-sm md:text-base mx-5 md:mx-9 text-black/60 max-w-xl">
          Ta commande a été confirmée. Un récapitulatif te sera envoyé.
        </p>
        <Link href="/shop" className={[" px-5 py-2.5 md-5 mt-8 mx-5 md:mx-9 inline-flex", "border border-[hsl(var(--be-wine))] text-[hsl(var(--be-wine))]",
                "hover:bg-[hsl(var(--be-wine))] hover:text-white",
                "active:scale-[0.98]",
                ].join(" ")}>
          Retour à la boutique
        </Link>
        <Footer />
      </div>
    );
  }

  return (
    <div className="pb-20 pt-20 bg-[hsl(var(--be-rose-bg))]">
        <Header />
      <div className="pt-8 md:pt-12 mx-5 md:mx-9">
        <p className="text-xs tracking-[0.2em] text-black/55">CHECKOUT</p>
        <h1 className="mt-2 text-3xl md:text-4xl font-semibold">Paiement</h1>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 mx-5 md:mx-9">
        <form onSubmit={confirmOrder} className="space-y-6">
          <div className="rounded-[28px] border border-black/10 bg-white p-6">
            <p className="text-sm font-medium">Informations</p>
            <div className="mt-4 grid gap-3">
              <input className="rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Nom complet" required />
              <input className="rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Téléphone" required />
              <input className="rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Email" type="email" required />
            </div>
          </div>

          <div className="rounded-[28px] border border-black/10 bg-white p-6">
            <p className="text-sm font-medium">Adresse de livraison</p>
            <div className="mt-4 grid gap-3">
              <input className="rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Ville" required />
              <input className="rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Quartier / Adresse" required />
              <textarea className="min-h-[90px] rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Note de livraison (optionnel)" />
            </div>
          </div>

          <button
            className={[
               "mt-4 px-5 py-2.5 w-full text-sm font-medium transition-all duration-200",
                "border border-[hsl(var(--be-wine))] text-[hsl(var(--be-wine))]",
                "hover:bg-[hsl(var(--be-wine))] hover:text-white",
                "active:scale-[0.98]",
              items.length === 0 ? "pointer-events-none opacity-40" : "",
            ].join(" ")}
            disabled={items.length === 0}
          >
            Confirmer la commande
          </button>

          <p className="text-xs text-black/45">
            Besoin d’aide ? <Link href="/contact" className="underline underline-offset-4">Contactez-nous</Link>
          </p>
        </form>

        <aside className="rounded-[28px] border border-black/10 bg-white p-6 h-fit">
          <p className="text-sm font-medium">Résumé</p>

          <div className="mt-4 space-y-4">
            {items.length === 0 ? (
              <p className="text-sm text-black/60">Panier vide.</p>
            ) : (
              items.map((it) => (
                <div key={`${it.id}:${it.size || ""}`} className="flex items-center gap-3">
                  <div className="h-14 w-12 rounded-2xl overflow-hidden border border-black/10 bg-black/5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={it.image} alt={it.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{it.title}</p>
                    <p className="text-xs text-black/55">
                      {it.size ? `Taille ${it.size} • ` : ""}Qté {it.qty}
                    </p>
                  </div>
                  <p className="text-sm">{formatXOF(it.price * it.qty)}</p>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 border-t border-black/10 pt-4 space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-black/60">Sous-total</span>
              <span>{formatXOF(total)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-black/60">Livraison</span>
              <span>—</span>
            </div>
            <div className="flex items-center justify-between font-medium">
              <span>Total</span>
              <span>{formatXOF(total)}</span>
            </div>
          </div>
        </aside>
      </div>
        <Footer />
    </div>
  );
}
