"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import { cartCount } from "@/lib/shopStorage";
import { wishlistCount } from "@/lib/wishlistStorage";

function IconMenu(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M4 7h16M4 12h16M4 17h16"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconSearch(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M16.5 16.5 21 21"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconUser(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 21a8 8 0 0 1 16 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
function IconBag(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M6.5 8h11l1.2 13H5.3L6.5 8Z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M9 8a3 3 0 0 1 6 0"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHeart(props: any) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="M12 21s-7-4.6-9.5-9.2C.8 8.5 2.3 5.8 5.3 5.1c1.8-.4 3.5.3 4.7 1.6 1.2-1.3 2.9-2 4.7-1.6 3 .7 4.5 3.4 2.8 6.7C19 16.4 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartN, setCartN] = useState(0);
  const [wishOpen, setWishOpen] = useState(false);
  const [wishN, setWishN] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const refreshCart = () => setCartN(cartCount());
    const refreshWish = () => setWishN(wishlistCount());

    refreshCart();
    refreshWish();

    window.addEventListener("cart:changed", refreshCart);
    window.addEventListener("wishlist:changed", refreshWish);

    window.addEventListener("cart:open", () => setCartOpen(true));
    window.addEventListener("wishlist:open", () => setWishOpen(true));

    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
        window.removeEventListener("cart:changed", refreshCart);
        window.removeEventListener("wishlist:changed", refreshWish);
        window.removeEventListener("scroll", onScroll);
    };
    }, []);


  // ✅ Couleurs demandées
  const wineText = "text-[hsl(var(--be-wine))]";
  const roseBg = "bg-[hsl(var(--be-rose-bg))]";

  // Home = blanc au-dessus du hero (puis noir au scroll)
  // Autres pages = wine
  const textClass = isHome ? (scrolled ? "text-black" : "text-white") : wineText;

  // Hover background : home -> blanc/10, pages -> wine/8
  const hoverBg = isHome
    ? scrolled
      ? "hover:bg-black/5"
      : "hover:bg-white/10"
    : "hover:bg-[hsla(var(--be-wine),0.08)]";

  const iconBtnClass = ["rounded-2xl p-2 transition", hoverBg, textClass].join(" ");
  const menuBtnClass = [
    "inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm transition",
    hoverBg,
    textClass,
  ].join(" ");

  const desktopTextClass = [
    "hidden md:flex items-center gap-6 text-[11px] tracking-[0.22em] uppercase",
    textClass,
  ].join(" ");

  return (
    <>
    <header
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
        // ✅ Home transparent, autres pages fond rose-bg
        isHome ? "bg-transparent" : `${roseBg} border-b border-black/10`,
      ].join(" ")}
    >
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="h-16 flex items-center justify-between relative">
        {/* LEFT: Menu */}
        <button onClick={() => setMenuOpen(true)} className={menuBtnClass} aria-label="Menu">
          <IconMenu className="h-5 w-5" />
          <span className="hidden sm:inline font-semibold text-[hsl(var(--be-pink))]">MENU</span>
        </button>

        {/* CENTER: Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.jpg" alt="Be Cute" className="h-8 w-auto select-none" />
        </Link>

        {/* RIGHT: Mobile icons */}
        <div className="flex items-center gap-1 md:hidden">
          <button className={iconBtnClass} aria-label="Search" title="Search">
            <IconSearch className="h-5 w-5" />
          </button>

          <Link href="/account" className={iconBtnClass} aria-label="Account" title="Account">
            <IconUser className="h-5 w-5" />
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className={[iconBtnClass, "relative"].join(" ")}
            aria-label="Bag"
            title="Bag"
          >
            <IconBag className="h-5 w-5" />
            {cartN > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d10f6a] px-1 text-[11px] text-white">
              {cartN}
            </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setWishOpen(true)}
            className={[iconBtnClass, "relative"].join(" ")}
          >
            <IconHeart className="h-5 w-5" />
            {wishN > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d10f6a] px-1 text-[11px] text-white">
                {wishN}
                </span>
            )}
          </button>

        </div>

        {/* RIGHT: Desktop text (remplace les icônes) */}
        <div className={desktopTextClass}>
          <Link href="/account" className="hover:opacity-80 transition font-semibold">
            IDENTIFIEZ-VOUS
          </Link>

          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="relative hover:opacity-80 transition font-semibold"
            aria-label="Panier"
            title="Panier"
          >
            PANIER
            {cartN > 0 && (
            <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d10f6a] px-1 text-[11px] text-white normal-case tracking-normal">
              {cartN}
            </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setWishOpen(true)}
            className={[iconBtnClass, "relative"].join(" ")}
          >
            WISHLIST
            {wishN > 0 && (
                <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#d10f6a] px-1 text-[11px] text-white normal-case tracking-normal">
                {wishN}
                </span>
            )}
          </button>
        </div>
        </div>
      </div>
    </header>

      {/* ✅ Menu Drawer (stylé Be Cute) */}
      <div className={menuOpen ? "fixed inset-0 z-[60]" : "hidden"}>
        <button
          className="absolute inset-0 bg-black/35"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        />

        <aside className={["absolute left-0 top-0 h-full w-[88%] max-w-[380px]", roseBg, "soft-shadow"].join(" ")}>
          <div className="h-16 px-5 flex items-center justify-between border-b border-black/10">
            <p className={["tracking-[0.22em] text-sm font-semibold uppercase", wineText].join(" ")}>
              <span className="text-[hsl(var(--be-pink))]">Be</span> <span className="text-black">Cute</span>
            </p>

            <button
              onClick={() => setMenuOpen(false)}
              className={[
                "px-4 py-2 text-sm transition border",
                "border-[hsla(var(--be-wine),0.25)]",
                "hover:bg-[hsla(var(--be-wine))] hover:text-white",
                wineText,
              ].join(" ")}
            >
              Fermer
            </button>
          </div>

          <div className="p-6 grid gap-2 text-sm">
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className={[
                "py-3 border-b",
                "border-[hsla(var(--be-wine),0.15)]",
                wineText,
                "hover:opacity-80 transition",
              ].join(" ")}
            >
              Shop
            </Link>

            <Link
              href="/shop?tag=new"
              onClick={() => setMenuOpen(false)}
              className={[
                "py-3 border-b",
                "border-[hsla(var(--be-wine),0.15)]",
                wineText,
                "hover:text-black",
              ].join(" ")}
            >
              Nouveautés
            </Link>
            
            <Link
              href="/shop?category=Robes"
              onClick={() => setMenuOpen(false)}
              className={[
                "py-3 border-b",
                "border-[hsla(var(--be-wine),0.15)]",
                wineText,
                "hover:text-black",
              ].join(" ")}
            >
              Robes
            </Link>

            <Link
              href="/shop?category=Robes"
              onClick={() => setMenuOpen(false)}
              className={[
                "py-3 border-b",
                "border-[hsla(var(--be-wine),0.15)]",
                wineText,
                "hover:text-black",
              ].join(" ")}
            >
              Ensembles
            </Link>

            <Link
              href="/shop?category=Plage"
              onClick={() => setMenuOpen(false)}
              className={[
                "py-3 border-b",
                "border-[hsla(var(--be-wine),0.15)]",
                wineText,
                "hover:text-black",
              ].join(" ")}
            >
              Vêtements de plage
            </Link>

            <Link
              href="/shop?category=Accessoires&tag=sacs"
              onClick={() => setMenuOpen(false)}
              className={[
                "py-3 border-b",
                "border-[hsla(var(--be-wine),0.15)]",
                wineText,
                "hover:text-black",
              ].join(" ")}
            >
              Sacs
            </Link>

            <Link
              href="/shop?category=Accessoires&tag=chaussures"
              onClick={() => setMenuOpen(false)}
              className={[
                "py-3 border-b",
                "border-[hsla(var(--be-wine),0.15)]",
                wineText,
                "hover:text-black",
              ].join(" ")}
            >
              Chaussures
            </Link>

            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={[
                "py-3",
                wineText,
                "hover:text-black",
              ].join(" ")}
            >
              Contact
            </Link>

            <div className="mt-6">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setCartOpen(true);
                }}
                className={[
                  "w-full py-3 text-sm font-medium transition border",
                  "border-[hsla(var(--be-wine),0.25)]",
                  "hover:bg-[hsla(var(--be-wine))] hover:text-white",
                  wineText,
                ].join(" ")}
              >
                Voir le panier {cartN > 0 ? `(${cartN})` : ""}
              </button>
            </div>
          </div>
        </aside>
      </div>
      <WishlistDrawer open={wishOpen} onClose={() => setWishOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
