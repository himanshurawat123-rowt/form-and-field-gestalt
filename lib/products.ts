import type { RailGarment } from "@/components/ui/product-rail-gallery";

export type ProductCategory = "tees" | "shirts" | "knitwear" | "outerwear" | "bottoms";

export interface ProductColorway {
  name: string;
  swatch: string;
}

export interface StoreProduct extends RailGarment {
  category: ProductCategory;
  price: number;
  sizes: string[];
  colorways: ProductColorway[];
}

const image = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1000&q=85`;

const standardSizes = ["XS", "S", "M", "L", "XL"];

export const PRODUCTS: StoreProduct[] = [
  {
    id: "heavyweight-tee",
    name: "Heavyweight Boxy Tee",
    description: "A substantial organic cotton jersey with a relaxed, considered shape.",
    category: "tees",
    price: 48,
    tag: "01 / ESSENTIALS",
    kind: "tee",
    color: "#e8dfd1",
    image: image("photo-1521572267360-ee0c2909d518"),
    details: ["240 gsm organic cotton", "Relaxed fit", "Made in Portugal"],
    sizes: standardSizes,
    colorways: [
      { name: "Undyed", swatch: "#e9e2d6" },
      { name: "Ink", swatch: "#22221f" },
      { name: "Moss", swatch: "#737761" },
    ],
  },
  {
    id: "everyday-oxford",
    name: "Everyday Oxford",
    description: "Soft, garment-washed cotton with a clean collar and an easy drape.",
    category: "shirts",
    price: 92,
    tag: "02 / SHIRTS",
    kind: "shirt",
    color: "#9bb6bd",
    image: image("photo-1598033129183-c4f50c736f10"),
    details: ["Garment-washed cotton", "Mother-of-pearl buttons", "Relaxed fit"],
    sizes: standardSizes,
    colorways: [
      { name: "Pale blue", swatch: "#9bb6bd" },
      { name: "Chalk", swatch: "#e8e3d8" },
      { name: "Ink", swatch: "#34383a" },
    ],
  },
  {
    id: "soft-knit",
    name: "Soft Knit Crew",
    description: "A fine-gauge merino layer made for cool mornings and late walks.",
    category: "knitwear",
    price: 128,
    tag: "03 / KNITWEAR",
    kind: "knit",
    color: "#8a9077",
    image: image("photo-1434389677669-e08b4cac3105"),
    details: ["Merino wool blend", "Fine-gauge knit", "Ribbed cuffs"],
    sizes: standardSizes,
    colorways: [
      { name: "Olive", swatch: "#828873" },
      { name: "Oat", swatch: "#cfc3ae" },
      { name: "Ink", swatch: "#343332" },
    ],
  },
  {
    id: "field-jacket",
    name: "Field Jacket",
    description: "A familiar utility silhouette, cut in durable cotton twill for everyday use.",
    category: "outerwear",
    price: 188,
    tag: "04 / OUTERWEAR",
    kind: "jacket",
    color: "#777b65",
    image: image("photo-1576995853123-5a10305d93c0"),
    details: ["Cotton twill", "Four utility pockets", "Recycled corozo buttons"],
    sizes: standardSizes,
    colorways: [
      { name: "Field olive", swatch: "#777b65" },
      { name: "Dark navy", swatch: "#39444b" },
      { name: "Stone", swatch: "#c6bba8" },
    ],
  },
  {
    id: "wide-trouser",
    name: "Relaxed Pleat Trouser",
    description: "A fluid, easy-wearing trouser with a clean front and a soft taper.",
    category: "bottoms",
    price: 118,
    tag: "05 / BOTTOMS",
    kind: "coat",
    color: "#5f5c57",
    image: image("photo-1594633312681-425c7b97ccd1"),
    details: ["Mid-weight cotton", "Single pleat", "Adjustable waist tabs"],
    sizes: ["28", "30", "32", "34", "36"],
    colorways: [
      { name: "Charcoal", swatch: "#5f5c57" },
      { name: "Sand", swatch: "#c9bba5" },
      { name: "Olive", swatch: "#777b65" },
    ],
  },
  {
    id: "everyday-hoodie",
    name: "Loopback Hoodie",
    description: "A softly structured layer with a brushed interior and considered details.",
    category: "outerwear",
    price: 138,
    tag: "06 / OUTERWEAR",
    kind: "hoodie",
    color: "#b7a99a",
    image: image("photo-1556821840-3a63f95609a7"),
    details: ["Organic cotton loopback", "Double-layer hood", "Relaxed fit"],
    sizes: standardSizes,
    colorways: [
      { name: "Clay", swatch: "#b7a99a" },
      { name: "Moss", swatch: "#777b65" },
      { name: "Ink", swatch: "#343332" },
    ],
  },
  {
    id: "long-coat",
    name: "Longline Wool Coat",
    description: "A clean-lined wool layer with room for a knit underneath.",
    category: "outerwear",
    price: 268,
    tag: "07 / OUTERWEAR",
    kind: "coat",
    color: "#a99c8b",
    image: image("photo-1539533018447-63fcce2678e3"),
    details: ["Recycled wool blend", "Fully lined", "Horn-effect buttons"],
    sizes: standardSizes,
    colorways: [
      { name: "Warm taupe", swatch: "#a99c8b" },
      { name: "Ink", swatch: "#343332" },
    ],
  },
];
