// lib/wishlistStorage.ts
export type WishItem = {
  id: string;
  slug: string;
  title: string;
  image: string;
  price: number;
};

const KEY = "be:wishlist";

function safeParse<T>(s: string | null, fallback: T): T {
  try {
    return s ? (JSON.parse(s) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function getWishlist(): WishItem[] {
  if (typeof window === "undefined") return [];
  return safeParse<WishItem[]>(localStorage.getItem(KEY), []);
}

export function setWishlist(items: WishItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new Event("wishlist:changed"));
}

export function isWished(productId: string) {
  return getWishlist().some((x) => x.id === productId);
}

// ✅ Toggle (add/remove)
export function toggleWishlist(item: WishItem) {
  const list = getWishlist();
  const exists = list.some((x) => x.id === item.id);
  const next = exists ? list.filter((x) => x.id !== item.id) : [item, ...list];
  setWishlist(next);
  return !exists; // true si ajouté, false si retiré
}

export function wishlistCount() {
  return getWishlist().length;
}
