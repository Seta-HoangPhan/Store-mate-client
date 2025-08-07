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

export interface ProductDetail extends Product {
  purchaseProducts: PurchaseProduct[];
}

export interface Product {
  id: number;
  name: string;
  description?: string;
  thumbnail?: string;
  sellingPrice: number;
  quantity: number;
  category?: {
    id: number;
    name: string;
  };
}

export interface Supplier {
  id: number;
  name: string;
  email?: string;
  address: string;
}

export interface Purchase {
  id: number;
  supplier: Supplier;
  importDate: string;
  purchaseProducts: PurchaseProduct[];
}

export interface PurchaseProduct {
  id: number;
  product: {
    id: number;
    name: string;
  };
  purchase: {
    id: number;
    supplier: Supplier;
    importDate: string;
  };
  unitPrice: number;
  netPrice: number;
  discount: number;
  quantity: number;
}
