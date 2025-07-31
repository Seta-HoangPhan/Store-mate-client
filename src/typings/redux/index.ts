export type APIStatus = "idle" | "loading" | "completed" | "rejected";

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
  unitPrice: number;
  sellingPrice: number;
  quantity: number;
  category: {
    id: number;
    name: string;
  };
}
