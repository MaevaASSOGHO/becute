import Link from "next/link";

type Item = {
  href: string;
  imageSrc: string;
  title: string;
  subtitle: string;
};

type Props = {
  left: Item;
  right: Item;
};

export default function CategoryDuo({ left, right }: Props) {
  return (
    <section className="mt-10 md:mt-14">
      {/* ✅ marges externes plus grandes */}
      <div className="px-4 md:px-8 lg:px-12">
        {/* ✅ marge interne plus petite */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <Card {...left} />
          <Card {...right} />
        </div>
      </div>
    </section>
  );
}

function Card({ href, imageSrc, title, subtitle }: Item) {
  return (
    <Link
      href={href}
      className="group relative block overflow-hidden bg-black/5"
      aria-label={title}
    >
      {/* ✅ image BEAUCOUP plus grande */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageSrc}
        alt={title}
        className="h-[70vh] min-h-[640px] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
      />

      {/* ✅ filtre/overlay pour lire le texte */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

      {/* Texte bas */}
      <div className="absolute inset-x-0 bottom-0 p-6 md:p-10 text-white">
        <p className="text-xs tracking-[0.28em] text-white/80">BE CUTE</p>
        <h3 className="mt-2 font-serif text-3xl md:text-4xl leading-tight">
          {title}
        </h3>
        <p className="mt-2 text-sm md:text-base text-white/80 max-w-[42ch]">
          {subtitle}
        </p>

        {/* <div className="mt-6 inline-flex items-center gap-2 border border-white/30 bg-white/10 px-5 py-3 text-sm font-medium transition group-hover:bg-white/15">
          Découvrir
          <span aria-hidden className="transition group-hover:translate-x-0.5">
            →
          </span>
        </div> */}
      </div>
    </Link>
  );
}
