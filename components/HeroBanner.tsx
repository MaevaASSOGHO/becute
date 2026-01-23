import Link from "next/link";

type Props = {
  href: string;
  imageSrc: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: string;
  heightClass?: string; // ex: "h-[70vh] min-h-[520px]"
};

export default function HeroBanner({
  href,
  imageSrc,
  eyebrow = "BE CUTE",
  title,
  subtitle,
  heightClass = "h-[70vh] min-h-[520px]",
}: Props) {
  return (
    <Link
      href={href}
      aria-label={title}
      className={[
        "group relative block w-screen overflow-hidden",
        // full-bleed
        "left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
        heightClass,
      ].join(" ")}
    >
      {/* image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* voile pour lisibilité */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent" />

      {/* texte bottom-center */}
      <div className="absolute inset-x-0 bottom-10 z-10 px-4 md:px-6 text-center text-white">
        <p className="text-xs tracking-[0.28em] text-white/80">{eyebrow}</p>

        <h2 className="mt-3 font-serif text-3xl md:text-5xl leading-tight">
          {title}
        </h2>

        {subtitle ? (
          <p className="mt-4 text-sm md:text-base text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        ) : null}

        {/* <div className="mt-7 flex justify-center">
          <span className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium transition border border-white/25 bg-white/10 group-hover:bg-white/15">
            {cta}
          </span>
        </div> */}
      </div>
    </Link>
  );
}
