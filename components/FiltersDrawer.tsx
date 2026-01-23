"use client";

import { useEffect, useMemo, useState } from "react";

type FiltersValue = { q: string; sort: string; tag: string };

type Props = {
  value: FiltersValue;
  onChange: (next: FiltersValue) => void;
  resultsCount: number;
};

function IconFilter(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function FiltersDrawer({ value, onChange, resultsCount }: Props) {
  const [open, setOpen] = useState(false);

  const sorts = useMemo(
    () => [
      { label: "À la une", value: "featured" },
      { label: "Nouveautés", value: "new" },
      { label: "Prix croissant", value: "price-asc" },
      { label: "Prix décroissant", value: "price-desc" },
    ],
    []
  );

  const tags = useMemo(
    () => [
      { label: "Tout", value: "all" },
      { label: "Nouveautés", value: "new" },
      { label: "Promotions", value: "sale" },
    ],
    []
  );

  // Couleurs Be Cute (comme ton menu)
  const wineText = "text-[hsl(var(--be-wine))]";
  const roseBg = "bg-[hsl(var(--be-rose-bg))]";

  // ESC pour fermer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const chipBase =
    "px-1 py-2 text-[11px] transition border border-[hsla(var(--be-pink)] hover:text-[hsla(var(--be-wine)]hover:bg-[hsl(var(--be-rose-bg-hover))]";
  const chipActive = "bg-[hsl(var(--be-wine))] text-white border-transparent hover:bg-[hsl(var(--be-wine))]";

  return (
    <>
      {/* Barre minimale: bouton Filtrer + compteur (tu peux la mettre où tu veux dans /shop) */}
      <div className="w-full mx-5">
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={[
              "inline-flex items-center gap-2 px-4 py-2 text-sm text-[hsl(var(--be-wine))] mx-5",
              "border-[hsla(var(--be-wine),0.25)]",
              "hover:bg-[hsla(var(--be-wine))] hover:text-white",
              wineText,
            ].join(" ")}
          >
            <IconFilter className="h-5 w-5" />
            Filtrer
          </button>

          <div className={["text-sm mr-50 opacity-80", "text-[hsl(var(--be-wine))]"].join(" ")}>
            {resultsCount} produit{resultsCount > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Drawer */}
      <div className={open ? "fixed inset-0 z-[60]" : "hidden"}>
        <button
          className="absolute inset-0 bg-black/35"
          onClick={() => setOpen(false)}
          aria-label="Close filters"
        />

        <aside
          className={[
            "absolute left-0 top-0 h-full w-[88%] max-w-[380px]",
            roseBg,
            "soft-shadow",
          ].join(" ")}
        >
          {/* Header drawer */}
          <div className="h-16 px-5 flex items-center justify-between border-b border-black/10">
            <p className={["tracking-[0.22em] text-sm font-semibold uppercase", wineText].join(" ")}>
              FILTRES
            </p>

            <button
              onClick={() => setOpen(false)}
              className={[
                "px-4 py-2 text-sm transition border",
                "border-[hsla(var(--be-wine),0.25)]",
                "hover:bg-[hsl(var(--be-wine))] hover:text-white",
                wineText,
              ].join(" ")}
            >
              Fermer
            </button>
          </div>

          {/* Contenu drawer */}
          <div className="p-6 grid gap-6 text-sm">
            {/* Recherche */}
            <div>
              <p className={["mb-2 text-[11px] tracking-[0.22em] uppercase", wineText].join(" ")}>
                Recherche
              </p>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={value.q}
                onChange={(e) => onChange({ ...value, q: e.target.value })}
                className={[
                  "w-full px-4 py-2 text-sm outline-none transition border bg-white/60",
                  "border-[hsla(var(--be-wine),0.22)] focus:border-[hsla(var(--be-wine),0.45)]",
                ].join(" ")}
              />
            </div>

            {/* Tri */}
            <div>
              <p className={["mb-2 text-[11px] tracking-[0.22em] uppercase", wineText].join(" ")}>
                Trier
              </p>
              <div className="flex flex-wrap gap-2">
                {sorts.map((s) => (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => onChange({ ...value, sort: s.value })}
                    className={[
                      chipBase,
                      wineText,
                      value.sort === s.value ? chipActive : "",
                    ].join(" ")}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className={["mb-2 text-[11px] tracking-[0.22em] uppercase", wineText].join(" ")}>
                Filtrer
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => onChange({ ...value, tag: t.value })}
                    className={[
                      chipBase,
                      wineText,
                      value.tag === t.value ? chipActive : "",
                    ].join(" ")}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 grid gap-2">
              <button
                type="button"
                onClick={() => {
                  onChange({ q: "", sort: "featured", tag: "all" });
                }}
                className={[
                  "w-full py-2 text-[13px] font-medium transition border",
                  "border-[hsla(var(--be-wine),0.25)]",
                  "hover:bg-[hsla(var(--be-wine),0.08)]",
                  wineText,
                ].join(" ")}
              >
                Réinitialiser
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className={[
                  "w-full py-2 text-[13px] font-medium transition border",
                  "border-transparent",
                  "bg-[hsl(var(--be-wine))] text-white hover:opacity-95",
                ].join(" ")}
              >
                Voir les résultats ({resultsCount})
              </button>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
