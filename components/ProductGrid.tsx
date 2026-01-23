import Link from "next/link";
import { Product } from "@/data/products";
import { formatXOF } from "@/lib/money";

type Props = {
  items: Product[];
  limit?: number;
};

export default function ProductGridEditorial({ items, limit = 10 }: Props) {
  const list = items.slice(0, limit);

  return (
    <section className="w-full bg-[hsl(var(--be-rose-bg))]">
      {/* full-bleed + pas de padding latéral */}
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-black/10">
          {list.map((p, idx) => (
            <article
              key={p.id}
              className="relative"
 >
              <Link href={`/product/${p.slug}`} className="group block">
                {/* Image grande, sans arrondi, sans marge */}
                <div className="relative w-full bg-white/20">
                    <div
                        className={[
                        "aspect-[2/3] w-full overflow-hidden",
                        "border-l-2 border-white/80",
                        idx === 0 ? "" : "border-l border-white/80",
                        ].join(" ")}
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                        src={p.images?.[0]}
                        alt={p.title}
                        className="h-full w-full object-cover"
                        />
                    </div>
                </div>


                {/* Texte (typo + espacement comme l'image) */}
                <div className="px-4 py-5 md:px-5 md:py-6">
                  {/* Pastilles couleur */}
                  <div className="mb-3 flex items-center gap-2">
                    {(p.colors || []).slice(0, 5).map((c) => (
                        <span
                            key={`${p.id}-${c}`}
                            className="h-2.5 w-2.5 rounded-full border border-black/15"
                            style={{ backgroundColor: colorToHex(c) }}
                            aria-label={c}
                            title={c}
                        />
                    ))}
                  </div>

                  {/* “Nom” en caps */}
                  <p className="text-[12px] tracking-[0.24em] uppercase text-[hsl(var(--be-berry))]">
                    {p.title.split("—")[0]?.trim() || p.title}
                  </p>

                  {/* Phrase serif italique (féminin) */}
                  <p className="mt-2 font-serif italic text-[14px] leading-relaxed text-black/70">
                    {p.description}
                  </p>

                  {/* Prix */}
                  <p className="mt-4 text-[12px] tracking-[0.16em] text-[hsl(var(--be-berry))] font-semibold">
                    {formatXOF(p.price)}
                  </p>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

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
