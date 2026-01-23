// lib/shopStorage.ts
export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
  size?: string;
  qty: number;
};

export type WishlistItem = {
  id: string;
  slug: string;
  title: string;
  price: number;
  image: string;
};

const CART_KEY = "becute_cart";
const WISHLIST_KEY = "becute_wishlist";

function safeParse<T>(raw: string | null, fallback: T): T {
  try {
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<CartItem[]>(localStorage.getItem(CART_KEY), []);
}

export function setCart(items: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("cart:changed"));
}

export function cartCount(): number {
  return getCart().reduce((sum, it) => sum + (it.qty || 0), 0);
}

export function cartTotal(): number {
  return getCart().reduce((sum, it) => sum + it.price * it.qty, 0);
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const key = `${item.id}:${item.size || ""}`;
  const existingIndex = cart.findIndex((c) => `${c.id}:${c.size || ""}` === key);

  if (existingIndex >= 0) {
    cart[existingIndex] = { ...cart[existingIndex], qty: cart[existingIndex].qty + item.qty };
    setCart(cart);
    return;
  }

  setCart([{ ...item }, ...cart]);
}

export function updateCartQty(id: string, size: string | undefined, qty: number) {
  const cart = getCart();
  const next = cart
    .map((it) => {
      if (it.id === id && (it.size || "") === (size || "")) return { ...it, qty };
      return it;
    })
    .filter((it) => it.qty > 0);
  setCart(next);
}

export function removeFromCart(id: string, size?: string) {
  const cart = getCart();
  const next = cart.filter((it) => !(it.id === id && (it.size || "") === (size || "")));
  setCart(next);
}

export function clearCart() {
  setCart([]);
}

// Wishlist
export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<WishlistItem[]>(localStorage.getItem(WISHLIST_KEY), []);
}

export function setWishlist(items: WishlistItem[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("wishlist:changed"));
}

export function wishlistCount(): number {
  return getWishlist().length;
}

export function toggleWishlist(item: WishlistItem) {
  const list = getWishlist();
  const exists = list.some((x) => x.id === item.id);
  const next = exists ? list.filter((x) => x.id !== item.id) : [item, ...list];
  setWishlist(next);
}

export function isInWishlist(id: string): boolean {
  return getWishlist().some((x) => x.id === id);
}
