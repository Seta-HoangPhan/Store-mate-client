import type { Product } from "@typings/redux";
import { axiosGet, axiosPost, axiosPut } from "../../../axiosClient";

export const fetchProducts = async (catIds: number[]) => {
  return await axiosGet<Product[]>({
    path: "/products",
    params: { catIds },
  });
};

export const fetchProductById = async (id: number) => {
  return await axiosGet<Product>({
    path: `/products/${id}`,
  });
};

export const createProduct = async (formData: FormData) => {
  return await axiosPost<Product>({
    path: "/products",
    data: formData,
    configs: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};

export const editProduct = async (id: number, formData: FormData) => {
  return await axiosPut<Product>({
    path: `/products/${id}`,
    data: formData,
    configs: {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  });
};
