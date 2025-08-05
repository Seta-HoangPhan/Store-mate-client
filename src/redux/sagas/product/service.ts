import { axiosGet, axiosPost } from "../../../axiosClient";
import type { Product } from "@typings/redux";

export const fetchProducts = async (catIds: number[]) => {
  return await axiosGet<Product[]>({
    path: "/products",
    params: { catIds },
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
