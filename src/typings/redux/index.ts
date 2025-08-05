export type APIStatus = "idle" | "loading" | "completed" | "rejected";

export interface User {
  id: number;
  email?: string;
  phone: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  thumbnail?: string;
  unitPrice: number;
  sellingPrice: number;
  quantity: number;
  category?: {
    id: number;
    name: string;
  };
}
