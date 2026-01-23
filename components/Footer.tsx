import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-1 bg-[hsl(var(--be-rose-bg))]">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12 grid gap-10 md:grid-cols-4">
        <div className="space-y-3">
          <img src="/logo.jpg" alt="BE CUTE" className="h-8 w-auto" />
          <p className="text-sm text-[hsl(var(--be-wine))]">
            Soyez belle et distinguée. Pièces premium, féminines et intemporelles.
          </p>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-medium text-[hsl(var(--be-wine))]">Customer services</p>
          <div className="grid gap-2 text-[hsl(var(--be-wine))]">
            <Link href="/faq" className="hover:text-black">FAQ</Link>
            <Link href="/size-guide" className="hover:text-black">Guide des tailles</Link>
            <Link href="/shipping" className="hover:text-black">Livraison</Link>
            <Link href="/returns" className="hover:text-black">Retours</Link>
          </div>
        </div>

        <div className="space-y-3 text-sm">
          <p className="font-medium text-[hsl(var(--be-wine))]">À propos</p>
          <div className="grid gap-2 text-[hsl(var(--be-wine))]">
            <Link href="/services" className="hover:text-black">Services</Link>
            <Link href="/contact" className="hover:text-black">Contact</Link>
            <Link href="/shop" className="hover:text-black">Boutique</Link>
          </div>
        </div>

        <div className="space-y-3 text-sm text-[hsl(var(--be-wine))]">
          <p className="font-medium">Newsletter</p>
          <form className="flex gap-2">
            <input
              className="w-full rounded-2xl border border-black/15 px-4 py-3 text-sm outline-none focus:border-black/30"
              placeholder="Votre email"
            />
            <button className="lux-btn-primary bg-[hsl(var(--be-wine))]" type="button">OK</button>
          </form>
          <p className="text-xs text-[hsl(var(--be-wine))]">
            En vous inscrivant, vous acceptez de recevoir nos nouveautés.
          </p>
        </div>
      </div>
    </footer>
  );
}
