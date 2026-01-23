// app/shop/page.tsx
"use client";

import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FiltersDrawer from "@/components/FiltersDrawer";
import ProductGrid from "@/components/ProductGrid";
import { products as all } from "@/data/products";
import SignatureSection from "@/components/SignatureSection";

type Sort = "featured" | "price-asc" | "price-desc" | "new";
type Tag = "all" | "new" | "sale";

export default function ShopPage() {
  const [filters, setFilters] = useState<{ q: string; sort: Sort; tag: Tag }>({
    q: "",
    sort: "featured",
    tag: "all",
  });

  const items = useMemo(() => {
    let list = [...all];

    if (filters.tag === "new") list = list.filter((p) => p.isNew);
    if (filters.tag === "sale") list = list.filter((p) => p.isSale);

    if (filters.q.trim()) {
      const q = filters.q.toLowerCase();
      list = list.filter((p) =>
        [p.title, p.category, ...(p.tags || [])].join(" ").toLowerCase().includes(q)
      );
    }

    if (filters.sort === "new") list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
    if (filters.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (filters.sort === "price-desc") list.sort((a, b) => b.price - a.price);

    return list;
  }, [filters]);

  return (
    <div className="pb-20 bg-[hsl(var(--be-rose-bg))]">
        <Header />
      {/* on laisse le layout gérer le header (il est fixed) */}
      <div className="pt-24 md:pt-28">
        <h1 className="mt-2 mx-5 text-3xl md:text-4xl font-semibold text-[hsl(var(--be-wine))]">
          Shop
        </h1>
        {/* <p className="mt-3 mx-5 text-sm md:text-base text-[hsl(var(--be-wine))] max-w-2xl">
          Des essentiels élégants, des pièces statement — choisis ton look.
        </p> */}
      </div>

      {/* ✅ le compteur doit être items.length */}
      <div className="mt-6 -mx-5 md:-mx-6">
        <FiltersDrawer value={filters} onChange={(next) => setFilters(next as typeof filters)} resultsCount={items.length} />
      </div>

      {/* ✅ full-bleed comme tes sections */}
        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mt-4">
        <ProductGrid items={items} />
      </div>

      <div className="mt-12 md:mt-16 -mx-4 md:-mx-6">
        <SignatureSection href="/shop" imageSrc="/hero/signature.png" />
      </div>
      {/* on laisse le layout gérer le footer */}
        <Footer />
    </div>
  );
}
