import { createAction } from "@reduxjs/toolkit";
import type { Supplier } from "@typings/redux";

export const fetchSuppliers = createAction("supplier/fetchAll");
export const fetchSuppliersSuccess = createAction<Supplier[]>(
  "supplier/fetchAll/success"
);
export const fetchSuppliersFailed = createAction<string>(
  "supplier/fetchAll/failed"
);

export const toggleOpenCreateSupplierDrawer = createAction(
  "supplier/drawer/create"
);

export const toggleOpenEditSupplierDrawer = createAction<number | undefined>(
  "supplier/drawer/edit"
);
export const fetchSupplierSuccess = createAction<Supplier>(
  "supplier/fetchOne/success"
);
export const fetchSupplierFailed = createAction<string>(
  "supplier/fetchOne/failed"
);

export interface SupplierCreate {
  name: string;
  phones: string[];
  email?: string;
  address: string;
}
export const createSupplier = createAction<SupplierCreate>("supplier/create");
export const createSupplierSuccess = createAction<Supplier>(
  "supplier/create/success"
);
export const createSupplierFailed = createAction<string>(
  "supplier/create/failed"
);

export interface SupplierEdit {
  id: number;
  name?: string;
  email?: string;
  address?: string;
  phones?: {
    id?: number;
    phone: string;
  }[];
}
export const editSupplier = createAction<SupplierEdit>("supplier/edit");
export const editSupplierSuccess = createAction<Supplier>(
  "supplier/edit/success"
);
export const editSupplierFailed = createAction<string>("supplier/edit/failed");

export const deleteSupplier = createAction<number>("supplier/delete");
export const deleteSupplierSuccess = createAction<{ id: number }>(
  "supplier/delete/success"
);
export const deleteSupplierFailed = createAction<string>(
  "supplier/delete/failed"
);
