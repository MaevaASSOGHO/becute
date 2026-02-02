// data/products.ts
export type Category = "Robes" | "Tops" | "Ensembles" | "Jupes" | "Accessoires" | "Plage" | "Chaussures";

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
    slug: "ensemble-aveline",
    title: "Ensemble Aveline",
    price: 24000,
    currency: "XOF",
    isNew: true,
    colors: ["Blanc", "Noir"],
    sizes: ["XS", "S", "M", "L"],
    images: ["/products/ensemble_arg.jpg", "/products/ensemble_arg1.jpg"],
    description:
      "Une robe satinée au tombé fluide, pensée pour sublimer la silhouette avec une touche couture.",
    details: ["Coupe ajustée, longueur midi", "Décolleté structuré", "Fente discrète", "Fermeture zip invisible"],
    care: ["Nettoyage à sec recommandé", "Repassage doux sur l’envers"],
    category: "Robes",
    tags: ["satin", "soirée", "glamour", "jupe"],
  },
  {
    id: "p2",
    slug: "robe-axa",
    title: "Robe Axa",
    price: 20000,
    currency: "XOF",
    isNew: true,
    // compareAt: 105000,
    colors: ["Vert", "Orange", "Rose"],
    sizes: ["S", "M", "L"],
    images: ["/hero/slide-3.jpg", "/products/robe_axa1.jpg", "/products/robe_axa2.jpg"],
    description:
      "Un ensemble structuré, minimal et puissant. Le genre de pièce qui fait entrer dans la pièce avant toi.",
    details: ["Veste coupe cintrée", "Pantalon taille haute", "Tissu premium, tenue impeccable"],
    care: ["Nettoyage à sec", "Suspension sur cintre recommandé"],
    category: "Robes",
    tags: ["robe", "sexy", "chic"],
  },
  {
    id: "p3",
    slug: "robe-Nina",
    title: "Robe Nina — Signature",
    price: 21500,
    currency: "XOF",
    isNew: true,
    colors: ["Noir", "Marron"],
    sizes: ["XS", "S", "M"],
    images: [ "/products/robe_nina.jpg"],
    description:
      "La robe signature Be Cute : structurée, féminine, et parfait pour une allure élégante sans effort.",
    details: ["Baleines légères", "Bretelles ajustables", "Maintien confortable"],
    care: ["Lavage à la main", "Séchage à plat"],
    category: "Robes",
    tags: ["robe", "long", "soirée"],
  },
  {
    id: "p4",
    slug: "robe-adele",
    title: "Robe Adele — Élégance",
    price: 25000,
    currency: "XOF",     
    isNew: true,
    colors: ["Noir", "Rose"],
    sizes: ["S", "M", "L"],
    images: ["/products/robe_adele.jpg", "/products/robe_adele1.jpg"],
    description:
      "Une robe intemporelle : taille haute, coupe flatteuse, et finition premium.",
    details: ["Taille haute", "Fente arrière", "Zip invisible"],
    care: ["Lavage délicat", "Repassage doux"],
    category: "Plage",
    tags: ["chic", "minimal", "élégant"],
  },
  {
    id: "p5",
    slug: "ensemble-pink",
    title: "Ensemble Pink ",
    price: 21500,
    currency: "XOF",
    colors: ["Blanc", "Noir"],
    sizes: ["Unique"],
    images: ["/products/ensemble_pink.jpg", "/products/ensemble_pink1.jpg"],
    description:
      "Idéal pour les soirées d’été, cet ensemble léger allie confort et style avec une touche de glamour.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Plage",
    tags: ["ensemble", "soirée", "plage", "bikini"],
  },
  {
    id: "p6",
    slug: "ensemble-prune",
    title: "Ensemble Prune",
    price: 15000,
    currency: "XOF",
    colors: ["Noir"],
    sizes: ["Unique"],
    images: ["/products/ensemble_prune.jpg"],
    description:
      "Idéal pour les soirées d’été, cet ensemble léger allie confort et style avec une touche de glamour.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Plage",
    tags: ["ensemble", "soirée", "plage", "bikini"],
  },
  {
    id: "p7",
    slug: "ensemble-aina",
    title: "Ensemble Aina",
    price: 16000,
    currency: "XOF",
    colors: ["Rose"],
    sizes: ["Unique"],
    images: ["/products/ensemble_aina.jpg"],
    description:
      "Pièce polyvalente, cet ensemble allie confort et style avec une touche de glamour.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Plage",
    tags: ["ensemble", "soirée", "plage", "bikini"],
  },
  {
    id: "p8",
    slug: "ensemble-lexie",
    title: "Ensemble Lexie",
    price: 26000,
    currency: "XOF",
    colors: ["Blanc"],
    sizes: ["Unique"],
    images: ["/products/ensemble_lexie.jpg"],
    description:
      "Pièce polyvalente, cet ensemble allie confort et style avec une touche de glamour.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Ensembles",
    tags: ["ensemble", "chic", "bureau", "working-girl"],
  },
  {
    id: "p13",
    slug: "robe-cleopatra",
    title: "Robe Cleopatra",
    price: 23000,
    currency: "XOF",
    isNew: true,
    colors: ["Blanc"],
    sizes: ["Unique"],
    images: ["/products/robe_cleopatra.jpg"],
    description:
      "Robe élégante et sophistiquée, parfaite pour les occasions spéciales.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Ensembles",
    tags: ["dentelle", "sexy", "satin", "soirée","robe"],
  },
  {
    id: "p9",
    slug: "sac-kyliana",
    title: "Sac Kyliana",
    price: 15000,
    currency: "XOF",
    colors: ["Orange"],
    sizes: ["Unique"],
    images: ["/products/bags.jpg"],
    description:
      "Idéal pour les soirées d’été, cet ensemble léger allie confort et style avec une touche de glamour.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Accessoires",
    tags: ["paille", "soirée", "plage", "chic"],
  },
  {
    id: "p10",
    slug: "shoes-hailee",
    title: "Chaussures Hailee",
    price: 28000,
    currency: "XOF",
    colors: ["Rouge"],
    sizes: ["Unique"],
    images: ["/products/shoes.jpg"],
    description:
      "Idéal pour les soirées d’été, cet ensemble léger allie confort et style avec une touche de glamour.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Chaussures",
    tags: ["talons", "diamant", "chic", "sexy"],
  },
  {
    id: "p11",
    slug: "shoes-jamila",
    title: "Chaussures Jamila",
    price: 26000,
    currency: "XOF",
    colors: ["Blanc"],
    sizes: ["Unique"],
    images: ["/products/shoes_jamila.jpg"],
    description:
      "Idéal pour les soirées d’été, cet ensemble léger allie confort et style avec une touche de glamour.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Chaussures",
    tags: ["talons", "chic", "diamant", "strass"],
  },
  {
    id: "p12",
    slug: "sac-faia",
    title: "Sac Faia",
    price: 20000,
    currency: "XOF",
    colors: ["Marron"],
    sizes: ["Unique"],
    images: ["/products/sac_faia.jpg"],
    description:
      "Idéal pour les soirées d’été, cet ensemble léger allie confort et style avec une touche de glamour.",
    details: ["Chaînette métal", "Fermoir premium", "Format soirée"],
    care: ["Ranger dans son pochon", "Éviter l’eau"],
    category: "Accessoires",
    tags: ["sac", "faia", "paille", "plage"],
  },
];

export const categories = ["Robes", "Tops", "Ensembles", "Jupes", "Accessoires", "Chaussures"] as const;

export function getProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}
