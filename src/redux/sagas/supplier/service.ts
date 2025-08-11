import type { Category, Supplier } from "@typings/redux";
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
} from "../../../axiosClient";
import type {
  SupplierCreate,
  SupplierEdit,
} from "@redux/features/supplier/action";

export const fetchAllSuppliers = async () => {
  return await axiosGet<Supplier[]>({ path: "/suppliers" });
};

export const fetchSupplierById = async (id: number) => {
  return await axiosGet<Category>({ path: `/suppliers/${id}` });
};

export const createSupplier = async (data: SupplierCreate) => {
  return await axiosPost<Supplier>({ path: "suppliers", data });
};

export const editSupplier = async ({ id, ...data }: SupplierEdit) => {
  return await axiosPut<Category>({ path: `/suppliers/${id}`, data });
};

export const deleteCategory = async (id: number) => {
  return await axiosDelete<Category>(`/categories/${id}`);
};
