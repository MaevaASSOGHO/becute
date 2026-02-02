import Link from "next/link";
import { Product } from "@/data/products";
import { formatXOF } from "@/lib/money";

type Props = {
  items: Product[];
};

export default function EditorialGrid({ items }: Props) {
  return (
    <section className="w-full bg-[hsl(var(--be-rose-bg))]">
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border-t border-black/10">
          {items.slice(0, 10).map((p, idx) => (
            <div
              key={p.id}
              className={[
                "relative",
                "border-black/10",
                "border-l",
                idx === 0 ? "border-l-0" : "",
              ].join(" ")}
            >
              <Link href={`/product/${p.slug}`} className="group block">
                <div className="relative w-full bg-white/40">
                  <div className="aspect-[3/4] w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.images?.[0]}
                      alt={p.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="px-4 py-5 md:px-5 md:py-6">
                  <div className="mb-3 flex items-center gap-2">
                    {(p.colors || []).slice(0, 4).map((c) => (
                      <span
                        key={c}
                        className="h-2.5 w-2.5 rounded-full border border-black/15"
                        style={{ backgroundColor: colorToHex(c) }}
                        aria-label={c}
                        title={c}
                      />
                    ))}
                  </div>

                  <p className="text-[13px] tracking-[0.22em] uppercase text-black/75">
                    {p.title.split("—")[0]?.trim() || p.title}
                  </p>

                  <p className="mt-2 font-serif italic text-[14px] leading-relaxed text-black/70">
                    {p.description}
                  </p>

                  <p className="mt-4 text-[13px] tracking-[0.12em] text-black/80">
                    {formatXOF(p.price)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function colorToHex(name: string) {
  const n = name.toLowerCase();
  if (n.includes("noir")) return "#111111";
  if (n.includes("ivoire")) return "#F3EFE6";
  if (n.includes("blanc")) return "#FFFFFF";
  if (n.includes("rose")) return "#E44C76";
  if (n.includes("rouge")) return "#C50E40";
  if (n.includes("beige")) return "#E7D7C7";
  if (n.includes("or") || n.includes("dor")) return "#D8B26E";
  return "#DDD";
}
export const __EDITORIAL_GRID_OK__ = true;
