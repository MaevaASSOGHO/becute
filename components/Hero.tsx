// components/Hero.tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mt-8 md:mt-12">
      <div className="relative overflow-hidden rounded-[28px] border border-black/10 bg-black">
        {/* Background image */}
        <div className="absolute inset-0 opacity-70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero.jpg"
            alt="Be Cute collection"
            className="h-full w-full object-cover"
          />
        </div>

        {/* overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />

        <div className="relative p-8 md:p-12 lg:p-16">
          <p className="text-xs tracking-[0.28em] text-white/70">BE CUTE</p>
          <h1 className="mt-3 text-3xl md:text-5xl font-semibold text-white leading-tight">
            Soyez belle et distinguée.
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base text-white/80 leading-relaxed">
            Des pièces élégantes, pensées pour sublimer la silhouette — du quotidien aux occasions.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/shop" className="lux-btn-primary">
              Découvrir la collection
            </Link>
            <Link
              href="/shop?tag=new"
              className="lux-btn-outline border-white/25 text-white hover:bg-white/10"
            >
              Nouveautés
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-2">
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
              Livraison rapide
            </span>
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
              Retours simplifiés
            </span>
            <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs text-white/80">
              Paiement sécurisé
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
