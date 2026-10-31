import { ProductVariant } from "./product-variant";

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  imageUrl: string;
  stock: number;
  variants: ProductVariant[];
}