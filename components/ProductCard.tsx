"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { formatXOF } from "@/lib/money";
import { useLocalStorageState } from "@/lib/useLocalStorage";

export default function ProductCard({ p }: { p: Product }) {
  const [wishlist, setWishlist] = useLocalStorageState<string[]>("be_wishlist", []);
  const liked = wishlist.includes(p.id);

  return (
    <div className="group">
      <Link href={`/product/${p.slug}`} className="block">
        <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-neutral-100 soft-shadow">
          <Image
            src={p.images[0]}
            alt={p.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            {p.isNew && <span className="badge-pink">New</span>}
            {p.isSale && <span className="badge-pink">Sale</span>}
          </div>
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium">{p.title}</p>
            <p className="text-sm text-black/70">
              {formatXOF(p.price)}
              {p.isSale && p.compareAt ? (
                <span className="ml-2 text-black/40 line-through">
                  {formatXOF(p.compareAt)}
                </span>
              ) : null}
            </p>
          </div>
        </div>
      </Link>

      <button
        className="mt-3 lux-btn-outline w-full"
        onClick={() => {
          if (liked) setWishlist(wishlist.filter((id) => id !== p.id));
          else setWishlist([...wishlist, p.id]);
        }}
      >
        {liked ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>
    </div>
  );
}
