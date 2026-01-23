import Link from "next/link";

type Props = {
  href: string;
  imageSrc: string;
};

export default function SignatureSection({ href, imageSrc }: Props) {
  return (
    <section className="mt-12 md:mt-16">
      {/* full-bleed sans aucune marge latérale */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-0">
        {/* Image avec hauteur réduite */}
        <Link href={href} className="group relative block h-[60vh] min-h-[480px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt="Signature Be Cute"
            className="absolute inset-0 h-full w-full object-cover
                       scale-[1.08] sm:scale-[1.03] lg:scale-100
                       transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-black/60 to-transparent" />


          {/* Texte overlay (bas-centre avec marge réduite) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 md:px-6 text-center text-white">
            <h2 className="font-serif text-3xl md:text-5xl leading-tight ">
              Signature
            </h2>
            <p className="mt-3 text-sm md:text-base text-white/80 max-w-2xl">
              L'allure, la douceur et le détail — pensés pour sublimer chaque silhouette.
            </p>
          </div>
        </Link>

        {/* Texte sous l'image (transition vers footer) */}
        <div className="mt-6 md:mt-18 pb-10 md:pb-1 text-center px-8 md:px-8">
          <p className="mt-2 font-serif italic text-[45px] md:text-[48px] text-[hsl(var(--be-berry))]">
            Par les femmes, pour les femmes.
          </p>
        </div>
      </div>
    </section>
  );
}