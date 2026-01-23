"use client";

import { useRef } from "react";

export default function ZoomImage({
  src,
  alt,
  className = "",
  zoom = 1.25,
}: {
  src: string;
  alt: string;
  className?: string;
  zoom?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--ox", `${x}%`);
    el.style.setProperty("--oy", `${y}%`);
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ox", `50%`);
    el.style.setProperty("--oy", `50%`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={["group relative h-full w-full overflow-hidden", className].join(" ")}
      style={
        {
          ["--ox" as any]: "50%",
          ["--oy" as any]: "50%",
        } as React.CSSProperties
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="h-full w-full select-none object-cover transition-transform duration-300 ease-out group-hover:scale-[var(--z)]"
        style={
          {
            transformOrigin: "var(--ox) var(--oy)",
            ["--z" as any]: zoom,
          } as React.CSSProperties
        }
      />
    </div>
  );
}
