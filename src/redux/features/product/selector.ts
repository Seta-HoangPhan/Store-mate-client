import type { RootState } from "@redux/store";

export const selectProducts = (state: RootState) => state.product.products;
export const selectOpenCreareProductDrawer = (state: RootState) =>
  state.product.isOpenCreateProductDrawer;
