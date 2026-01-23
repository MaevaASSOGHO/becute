"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function HeroCarousel() {
  const slides = useMemo(
    () => [
      { src: "/hero/slide-1.jpg", alt: "Be Cute — Look 1" },
      { src: "/hero/slide-2.jpg", alt: "Be Cute — Look 2" },
      { src: "/hero/slide-3.jpg", alt: "Be Cute — Look 3" },
      { src: "/hero/slide-4.jpg", alt: "Be Cute — Look 4" },
    ],
    []
  );

  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    // ✅ Le hero prend toute la largeur écran
    <section className="relative w-screen overflow-hidden">
      {/* ✅ Le conteneur change de ratio selon la taille d’écran:
          - desktop: paysage (19/10 proche House of CB)
          - mobile: portrait (9/16) */}
      <div className="relative w-full aspect-[19/10] max-md:aspect-[9/16]">
        {/* Track horizontal */}
        <div
          className="absolute inset-0 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${i * 100}%)` }}
        >
          {slides.map((s) => (
            <div key={s.src} className="relative h-full w-full shrink-0">
              {/* ✅ COVER pour remplir le cadre (comme House of CB)
                  ✅ object-position ajustable selon tes images */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.src}
                alt={s.alt}
                className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
              />

              {/* ✅ Voile en bas pour lisibilité (pas sur toute l’image) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ))}
        </div>

        {/* ✅ Content overlay (sans max-width qui crée des “marges” au hero) */}
        <div className="absolute inset-0 z-10">
          {/* espace pour header fixed */}
          <div className="pt-16" />

          {/* Texte bottom-center */}
          <div className="absolute inset-x-0 bottom-10 px-4 md:px-6 text-center text-white">
            <p className="text-xs tracking-[0.28em] text-white/75">BE CUTE</p>

            <h1 className="mt-3 text-3xl md:text-5xl font-semibold leading-tight">
              Nouvelle collection
            </h1>

            <p className="mt-4 text-sm md:text-base text-white/80 leading-relaxed max-w-2xl mx-auto">
              Des pièces raffinées, pensées pour sublimer la silhouette quelle que soit l'occasion.
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/shop?tag=new"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium transition border border-white/35 bg-white/10 hover:bg-[hsl(var(--be-pink)),_/_0.9)] hover:border-[hsl(var(--be-pink))] hover:text-white active:scale-[0.98]"
              >
                Découvrir
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
