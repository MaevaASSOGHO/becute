// data/products.ts
export type Category = "Robes" | "Tops" | "Ensembles" | "Jupes" | "Accessoires" | "Plage";

export type Product = {
  id: string;
  slug: string;
  title: string;              // ✅ champ unique utilisé partout
  price: number;
  currency: "XOF";
  isNew?: boolean;
  isSale?: boolean;
  compareAt?: number;
  colors: string[];
  sizes: string[];
  images: string[];           // public paths
  description: string;
  details: string[];
  care: string[];
  category: Category;
  tags?: string[];            // ✅ utile pour recherche/filtres
};

export const products: Product[] = [
  {
    id: "p1",
    slug: "robe-satine-rose-minuit",
    title: "Robe satinée — Rose Minuit",
    price: 59000,
    currency: "XOF",
    isNew: true,
    colors: ["Rose", "Noir"],
    sizes: ["XS", "S", "M", "L"],
    images: ["/hero/slide-1.jpg", "/products/robe-1b.jpg", "/products/robe-1c.jpg"],
    description:
      "Une robe satinée au tombé fluide, pensée pour sublimer la silhouette avec une touche couture.",
    details: ["Coupe ajustée, longueur midi", "Décolleté structuré", "Fente discrète", "Fermeture zip invisible"],
    care: ["Nettoyage à sec recommandé", "Repassage doux sur l’envers"],
    category: "Robes",
    tags: ["satin", "soirée", "glamour"],
  },
  {
    id: "p2",
    slug: "ensemble-tailleur-chic",
    title: "Ensemble tailleur — Chic",
    price: 89000,
    currency: "XOF",
    isSale: true,
    compareAt: 105000,
    colors: ["Noir", "Ivoire"],
    sizes: ["S", "M", "L"],
    images: ["/products/ens-1.jpg", "/products/ens-1b.jpg"],
    description:
      "Un ensemble structuré, minimal et puissant. Le genre de pièce qui fait entrer dans la pièce avant toi.",
    details: ["Veste coupe cintrée", "Pantalon taille haute", "Tissu premium, tenue impeccable"],
    care: ["Nettoyage à sec", "Suspension sur cintre recommandé"],
    category: "Ensembles",
    tags: ["tailleur", "business", "chic"],
  },
  {
    id: "p3",
    slug: "top-corset-signature",
    title: "Top corset — Signature",
    price: 42000,
    currency: "XOF",
    isNew: true,
    colors: ["Noir", "Rose"],
    sizes: ["XS", "S", "M"],
    images: ["/hero/slide-3.jpg", "/products/top-1b.jpg"],
    description:
      "Le top signature Be Cute : structuré, féminin, et parfait pour une allure élégante sans effort.",
    details: ["Baleines légères", "Bretelles ajustables", "Maintien confortable"],
    care: ["Lavage à la main", "Séchage à plat"],
    category: "Tops",
    tags: ["corset", "signature", "soirée"],
  },
  {
    id: "p4",
    slug: "jupe-crayon-elegance",
    title: "Jupe crayon — Élégance",
    price: 39000,
    currency: "XOF",
    colors: ["Noir"],
    sizes: ["S", "M", "L"],
    images: ["/products/jupe-1.jpg", "/products/jupe-1b.jpg"],
    description:
      "Une jupe crayon intemporelle : taille haute, coupe flatteuse, et finition premium.",
    details: ["Taille haute", "Fente arrière", "Zip invisible"],
    care: ["Lavage délicat", "Repassage doux"],
    category: "Jupes",
    tags: ["office", "minimal", "élégant"],
  },
  {
    id: "p5",
    slug: "sac-mini-glam",
    title: "Mini sac — Glam",
    price: 29000,
    currency: "XOF",
    colors: ["Rose", "Noir"],
    sizes: ["Unique"],
    images: ["/products/sac-1.jpg", "/products/sac-1b.jpg"],
    description:
      "Le détail qui change tout. Mini format, maxi impact, parfait pour tes soirées.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Accessoires",
    tags: ["accessoire", "soirée"],
  },
];

export const categories = ["Robes", "Tops", "Ensembles", "Jupes", "Accessoires"] as const;

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
