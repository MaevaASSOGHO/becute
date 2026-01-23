import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";
import HeroBanner from "@/components/HeroBanner";
import CategoryDuo from "@/components/CategoryDuo";
import SignatureSection from "@/components/SignatureSection";
import Link from "next/link";

export default function HomePage() {
  const newItems = products.filter((p) => p.isNew).slice(0, 8);
  const best = products.slice(0, 8);


  return (
    <div className="pb-20 bg-[hsl(var(--be-rose-bg))]">
      <Header />
      {/* HERO en full-bleed derrière le header */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
        <HeroCarousel />
      </div>

      {/* Le reste du contenu doit démarrer normalement */}
      <section className="mt-0">
        {/* <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-black/55">NOUVEAUTÉS</p>
            <h2 className="mt-2 text-2xl md:text-3xl font-semibold">New arrivals</h2>
          </div>
          <Link href="/shop?tag=new" className="text-sm text-black/60 hover:text-black underline underline-offset-4">
            Voir tout
          </Link>
        </div> */}

        <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen">
          <ProductGrid items={newItems} />
        </div>
      </section>

      <section className="mt-10 md:mt-12">
        <HeroBanner
          href="/shop?category=Accessoires&tag=plage"
          imageSrc="/hero/hero-banner.jpg"
          eyebrow="COLLECTION"
          title="Beachwear"
          subtitle="Maillots, ensembles légers et accessoires — l’élégance qui suit le soleil."
          heightClass="h-[70vh] min-h-[520px]"
        />
      </section>

      <CategoryDuo
        left={{
          href: "/shop?category=Accessoires&tag=sacs",
          imageSrc: "/products/bags.jpg",
          title: "Sacs",
          subtitle: "Mini formats, détails premium — le finishing touch.",
        }}
        right={{
          href: "/shop?category=Accessoires&tag=chaussures",
          imageSrc: "/products/shoes.jpg",
          title: "Chaussures",
          subtitle: "Des silhouettes qui élancent. Du jour à la nuit.",
        }}
      />

      {/* <section className="mt-12 md:mt-16">
        <div className="rounded-[28px] border border-black/10 bg-[#fff0f7] p-8 md:p-10">
          <p className="text-xs tracking-[0.2em] text-black/55">SIGNATURE</p>
          <h3 className="mt-2 text-2xl md:text-3xl font-semibold">
            Élégance, confiance, détails impeccables.
          </h3>
          <p className="mt-3 text-sm md:text-base text-black/65 max-w-2xl">
            Be Cute sélectionne des coupes flatteuses et des finitions premium. Du minimal chic au glamour assumé.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/shop" className="lux-btn-primary">Shop now</Link>
            <Link href="/contact" className="lux-btn-outline">Nous contacter</Link>
          </div>
        </div>
      </section> */}

        <SignatureSection
        href="/shop"
        imageSrc="/hero/signature.png"
      />

      <Footer />
    </div>
  );
}
