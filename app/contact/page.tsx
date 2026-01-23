// app/contact/page.tsx
import Header from "@/components/Header";
import SignatureSection from "@/components/SignatureSection";
import Footer from "@/components/Footer";
export default function ContactPage() {
  return (
    <div className="pb-20 pt-20 bg-[hsl(var(--be-rose-bg))]">
      <Header />
      <div className="pt-8 md:pt-12">
        <p className="text-xs mx-5 tracking-[0.2em] text-black/55">CONTACT</p>
        <h1 className="mt-2 mx-5 text-3xl md:text-4xl font-semibold">
          <span className="text-[hsl(var(--be-pink))]">Be</span> <span className="text-black">Cute</span>
        </h1>
        <p className="mt-3 mx-5 text-sm md:text-base text-black/60 max-w-2xl">
          Une question sur une taille, une commande ou une livraison ? Écris-nous.
        </p>
      </div>

      <div className="mt-8 mx-5 grid gap-10 lg:grid-cols-2">
        <div className="rounded-[28px] border border-black/10 bg-white p-6">
          <p className="text-sm font-medium">Nous contacter</p>
          <form className="mt-4 grid gap-3">
            <input className="rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Nom" />
            <input className="rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Email" type="email" />
            <textarea className="min-h-[120px] rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30" placeholder="Message" />
            <button type="button" className="lux-btn-primary w-full">
              Envoyer
            </button>
          </form>

          <p className="mt-4 text-xs text-black/45">
            Réponse sous 24–48h (jours ouvrés).
          </p>
        </div>

        <div className="rounded-[28px] border border-black/10 bg-[#fff0f7] p-6">
          <p className="text-sm font-medium">Assistance</p>
          <div className="mt-4 space-y-3 text-sm text-black/70">
            <p>• WhatsApp : +225 XX XX XX XX</p>
            <p>• Email : contact@becute.com</p>
            <p>• Horaires : Lun–Sam, 10h–18h</p>
          </div>

          <div className="mt-6 rounded-[22px] border border-black/10 bg-white p-5">
            <p className="text-sm font-medium">Conseils tailles</p>
            <p className="mt-2 text-sm text-black/60">
              Envoie tes mensurations (poitrine/taille/hanches) et la pièce qui t’intéresse,
              on t’aide à choisir.
            </p>
          </div>
        </div>
      </div>
      <SignatureSection
                      href="/shop"
                      imageSrc="/hero/signature.png"
                    />
      <Footer />
    </div>
  );
}
