"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Link from "next/link";
import { products } from "@/data/products";
import SizePicker from "@/components/SizePicker";
import AddToBag from "@/components/AddToBag";
import ProductGrid from "@/components/ProductGrid";
import { formatXOF } from "@/lib/money";
import ZoomImage from "@/components/ZoomImage";
import { toggleWishlist, isWished } from "@/lib/wishlistStorage";
import Footer from "@/components/Footer";

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill={filled ? "currentColor" : "none"}>
      <path
        d="M12 21s-7-4.6-9.5-8.6C.7 9.2 2.2 6.4 5 5.6c1.9-.6 3.9.1 5 1.6 1.1-1.5 3.1-2.2 5-1.6 2.8.8 4.3 3.6 2.5 6.8C19 16.4 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = useMemo(() => products.find((p) => p.slug === params.slug), [params.slug]);

  const [size, setSize] = useState<string | undefined>(undefined);
  const [wish, setWish] = useState(false);

  // init wishlist (client)
  useMemo(() => {
    if (typeof window !== "undefined" && product) {
      setWish(isWished(product.id));
    }
  }, [product]);

  if (!product) {
    return (
      <div className="py-20">
        <p className="text-sm text-black/60">Produit introuvable.</p>
        <Link href="/shop" className="mt-6 inline-flex px-5 py-3 border border-black/15 hover:bg-black/5">
          Retour boutique
        </Link>
      </div>
    );
  }

  const suggested = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 8);

  const wineText = "text-[hsl(var(--be-wine))]";
  const wineLine = "border-[hsla(var(--be-wine),0.18)]";

  return (
    <div className="pb-20 bg-[hsl(var(--be-rose-bg))]">
    <Header />
      {/* espace pour header fixed */}
      <div className="pt-24 md:pt-28" />

      {/* Breadcrumb */}
      <div className="px-4 md:px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className={["flex items-center gap-2 text-[13px] tracking-[0.12em] uppercase opacity-80", wineText].join(" ")}>
            <Link href="/shop" className="hover:opacity-100 underline underline-offset-4">
              Shop
            </Link>
            <span className="opacity-40">/</span>
            <span className="opacity-90">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="mt-6 px-0 md:px-6">
        <div className="mx-auto max-w-[1200px] grid gap-10 lg:grid-cols-[1.45fr_0.85fr]">
          {/* GALLERY — grille “House of CB”, coins carrés, séparateurs blancs */}
          <div className="bg-[hsl(var(--be-rose-bg))]">
            <div className={["grid grid-cols-1 gap-0 border-t", wineLine].join(" ")}>
                {product.images.map((src, idx) => (
                    <div key={src + idx} className={["border-b bg-white/20", wineLine].join(" ")}>
                    {/* ✅ 1 image par ligne + plus “grand” */}
                        <div className="relative w-full">
                            {/* plus grand : tu peux changer les ratios */}
                            <div className="aspect-[3/4] md:aspect-[3/4]">
                            <ZoomImage
                                src={src}
                                alt={product.title}
                                zoom={1.25}
                                className="h-full w-full"
                            />
                            </div>
                        </div>
                    </div>
                ))}
                </div>
          </div>

          {/* INFO */}
          <aside className="px-4 mt-8 md:px-0">
            {/* Heart top */}
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h1
                  className={[
                    "font-[var(--font-serif)] italic",
                    "text-xl md:text-3xl leading-snug",
                    wineText,
                  ].join(" ")}
                >
                  {product.title}
                </h1>

                <p className={["mt-2 text-[13px] tracking-[0.22em] uppercase opacity-80", wineText].join(" ")}>
                  {product.category}
                </p>
              </div>

              <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    const added = toggleWishlist({
                        id: product.id,
                        slug: product.slug,
                        title: product.title,
                        price: product.price,
                        image: product.images?.[0] || "/placeholder.jpg",
                    });

                    setWish(isWished(product.id));
                    window.dispatchEvent(new Event("wishlist:open"));
                }}
                className={[
                    "h-11 w-11 flex items-center justify-center",
                    "hover:bg-[hsla(var(--be-wine),0.06)]",
                    wineText,
                ].join(" ")}
              >
                <HeartIcon filled={wish} />
              </button>

            </div>

            {/* Price */}
            <div className="mt-4 flex items-end gap-3">
              <span className={["text-[15px] tracking-[0.22em] uppercase", wineText].join(" ")}>
                {formatXOF(product.price)}
              </span>
              {product.compareAt ? (
                <span className={["text-[13px] tracking-[0.18em] uppercase line-through opacity-50", wineText].join(" ")}>
                  {formatXOF(product.compareAt)}
                </span>
              ) : null}
            </div>

            <div className={["mt-5 border-t", wineLine].join(" ")} />

            {/* Couleurs (swatches) */}
            {!!product.colors?.length && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <p className={["text-[13px] tracking-[0.22em] uppercase", wineText].join(" ")}>
                    Couleur
                  </p>
                  <div className="flex items-center gap-2">
                    {product.colors.slice(0, 5).map((c, idx) => (
                      <span
                        key={`${c}-${idx}`}
                        className="h-3.5 w-3.5 rounded-full border"
                        style={{ backgroundColor: colorToHex(c) }}
                        aria-label={c}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
                <div className={["mt-4 border-t", wineLine].join(" ")} />
              </div>
            )}

            {/* Tailles */}
            <div className="mt-6">
              {!!product.sizes?.length && (
                <SizePicker sizes={product.sizes} value={size} onChange={setSize} />
              )}
            </div>

            {/* CTA */}
            <div className="mt-6">
              <AddToBag product={product} size={size} />
            </div>

            {/* Description */}
            <div className="mt-8">
              <p className={["text-[13px] tracking-[0.22em] uppercase", wineText].join(" ")}>
                Description
              </p>
              <p className={["mt-3 text-sm leading-relaxed opacity-80", wineText].join(" ")}>
                {product.description}
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Suggestions */}
      {!!suggested.length && (
        <section className="mt-14 md:mt-20 px-4 md:px-6">
          <div className="mx-auto max-w-[1200px]">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className={["text-[13px] tracking-[0.22em] uppercase opacity-70", wineText].join(" ")}>
                  Suggestions
                </p>
                <h2 className={["mt-2 font-[var(--font-serif)] italic text-2xl md:text-3xl", wineText].join(" ")}>
                  You may also like
                </h2>
              </div>
              <Link
                href="/shop"
                className={["text-[13px] tracking-[0.18em] uppercase underline underline-offset-4 opacity-80 hover:opacity-100", wineText].join(" ")}
              >
                Voir plus
              </Link>
            </div>

            <div className="mt-6 -mx-4 md:-mx-6">
              <ProductGrid items={suggested} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

/** mapping simple couleur -> rendu visuel */
function colorToHex(name: string) {
  const n = (name || "").toLowerCase();
  if (n.includes("noir")) return "#111111";
  if (n.includes("ivoire")) return "#F3EFE6";
  if (n.includes("blanc")) return "#FFFFFF";
  if (n.includes("rose")) return "#E44C76";
  if (n.includes("rouge")) return "#C50E40";
  if (n.includes("beige")) return "#E7D7C7";
  if (n.includes("or") || n.includes("dor")) return "#D8B26E";
  return "#DDD";
}
