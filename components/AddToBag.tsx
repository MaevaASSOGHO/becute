"use client";

import { useState } from "react";
import { addToCart } from "@/lib/shopStorage";

export default function AddToBag({
  product,
  size,
}: {
  product: any;
  size?: string;
}) {
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState<"ok" | "err" | null>(null);

  function onAdd() {
    if (product.sizes?.length && !size) {
      setFlash("err");
      setTimeout(() => setFlash(null), 1200);
      return;
    }

    addToCart({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      image: product.images?.[0],
      size,
      qty,
    });

    window.dispatchEvent(new CustomEvent("cart:open"));
    setFlash("ok");
    setTimeout(() => setFlash(null), 1200);
  }

  const wineText = "text-[hsl(var(--be-wine))]";
  const wineBorder = "border-[hsla(var(--be-wine),0.35)]";

  return (
    <div className="space-y-3">
      {/* Quantité (optionnel mais clean) */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          className={[
            "h-8 min-w-8 text-[11px] border transition rounded-[1px]",
            wineBorder,
            "hover:bg-[hsla(var(--be-wine),0.06)]",
            wineText,
          ].join(" ")}
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          aria-label="Diminuer"
        >
          −
        </button>

        <div className={["min-w-14 text-center text-[13px] tracking-[0.18em] uppercase", wineText].join(" ")}>
          {qty}
        </div>

        <button
          type="button"
          className={[
            "h-8 min-w-8 text-[11px] border transition rounded-[1px]",
            wineBorder,
            "hover:bg-[hsla(var(--be-wine),0.06)]",
            wineText,
          ].join(" ")}
          onClick={() => setQty((q) => Math.min(9, q + 1))}
          aria-label="Augmenter"
        >
          +
        </button>
      </div>

      {/* CTA */}
      <button
        type="button"
        onClick={onAdd}
        className={[
          "w-full h-12 border transition",
          "rounded-[12px]",
          "bg-[hsl(var(--be-wine))] text-white",
          "hover:opacity-90",
          "text-[13px] tracking-[0.2em] uppercase",
        ].join(" ")}
      >
        Ajouter au panier
      </button>

      {flash === "err" && (
        <p className="text-[13px] tracking-[0.02em] text-[hsl(var(--be-wine))] opacity-80">
          Veuillez sélectionner une taille
        </p>
      )}
      {flash === "ok" && (
        <p className="text-[13px] tracking-[0.02em] text-[hsl(var(--be-wine))] opacity-80">
          Ajouté ✨
        </p>
      )}
    </div>
  );
}
