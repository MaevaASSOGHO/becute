"use client";

export default function SizePicker({
  sizes,
  value,
  onChange,
}: {
  sizes: string[];
  value?: string;
  onChange: (s: string) => void;
}) {
  const wineText = "text-[hsl(var(--be-wine))]";
  const wineBorder = "border-[hsla(var(--be-wine),0.45)]";
  const wineBorderSoft = "border-[hsla(var(--be-wine),0.22)]";

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className={["text-[13px] tracking-[0.22em] uppercase", wineText].join(" ")}>
          Taille
        </p>

        <button
          type="button"
          className={[
            "text-[13px] tracking-[0.18em] uppercase underline underline-offset-4 opacity-80 hover:opacity-100 transition",
            wineText,
          ].join(" ")}
        >
          Guide de taille
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {sizes.map((s) => {
          const active = value === s;
          return (
            <button
              key={s}
              type="button"
              onClick={() => onChange(s)}
              className={[
                "h-8 min-w-8 px-4 text-[10px] tracking-[0.18em] uppercase transition border",
                // ✅ moins arrondi (presque carré)
                "rounded-[10px]",
                active
                  ? ["bg-[hsl(var(--be-wine))] text-white", wineBorder].join(" ")
                  : ["bg-transparent hover:bg-[hsla(var(--be-wine),0.06)]", wineBorderSoft, wineText].join(" "),
              ].join(" ")}
            >
              {s}
            </button>
          );
        })}
      </div>

      {/* mini hint style HOCB */}
      <div className={["h-px w-full bg-[hsla(var(--be-wine),0.18)]"].join(" ")} />
    </div>
  );
}
