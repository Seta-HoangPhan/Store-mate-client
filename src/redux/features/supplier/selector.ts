import type { RootState } from "@redux/store";

export const selectSuppliers = (state: RootState) => state.supplier.suppliers;

export const selectIsOpenCreateSupplierDrawer = (state: RootState) =>
  state.supplier.isOpenCreateSupplierDrawer;

export const selectIsOpenEditSupplierDrawer = (state: RootState) =>
  state.supplier.isOpenEditSupplierDrawer;

export const selectSupplierDetail = (state: RootState) =>
  state.supplier.supplierDetail;

export const selectSupplierCreate = (state: RootState) =>
  state.supplier.supplierCreate;

export const selectSupplierEdit = (state: RootState) =>
  state.supplier.supplierEdit;

export const selectSupplierDelete = (state: RootState) =>
  state.supplier.supplierDelete;
