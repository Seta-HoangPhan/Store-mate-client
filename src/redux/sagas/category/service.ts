import type { Category } from "@typings/redux";
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
} from "../../../axiosClient";

export const fetchAllCategories = async () => {
  return await axiosGet<Category[]>({ path: "/categories" });
};

export const fetchCategoryById = async (id: number) => {
  return await axiosGet<Category>({ path: `/categories/${id}` });
};

export const createCategory = async (data: {
  name: string;
  description?: string;
}) => {
  return await axiosPost<Category>({ path: "categories", data });
};

export const editCategory = async (
  id: number,
  data: {
    name?: string;
    description?: string;
  }
) => {
  return await axiosPut<Category>({ path: `/categories/${id}`, data });
};

export const deleteCategory = async (id: number) => {
  return await axiosDelete<Category>(`/categories/${id}`);
};
