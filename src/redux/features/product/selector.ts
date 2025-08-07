import type { RootState } from "@redux/store";
import type { Product } from "@typings/redux";
import { removeAccents } from "@utils/removeAccents";
import { createSelector } from "reselect";

export const selectProducts = (state: RootState) => state.product.products;

export const selectProductDetail = (state: RootState) =>
  state.product.productDetail;

export interface FlatPurchaseProduct {
  id: number;
  supplier: string;
  importDate: string;
  unitPrice: number;
  discount: number;
  netPrice: number;
  quantity: number;
}

export const selectFlatPurchaseProducts = createSelector(
  selectProductDetail,
  ({ data: productDetail }): FlatPurchaseProduct[] => {
    const purchaseProducts = productDetail?.purchaseProducts || [];
    return purchaseProducts.map((purProd) => ({
      id: purProd.id,
      supplier: purProd.purchase.supplier.name,
      importDate: purProd.purchase.importDate,
      unitPrice: purProd.unitPrice,
      discount: purProd.discount,
      netPrice: purProd.netPrice,
      quantity: purProd.quantity,
    }));
  }
);

export const selectOpenCreareProductDrawer = (state: RootState) =>
  state.product.isOpenCreateProductDrawer;

export const selectOpenEditProductDrawer = (state: RootState) =>
  state.product.isOpenEditProductDrawer;

export const selectProductCreate = (state: RootState) =>
  state.product.productCreate;

export const selectProductEdit = (state: RootState) =>
  state.product.productEdit;

export const selectFilterCategoryIds = (state: RootState) =>
  state.product.filterCategoryIds;

export const selectFilterCategorySearch = (state: RootState) =>
  state.product.filterCategorySearch;

const selectCategories = (state: RootState) => state.product.categories;

export const selectCategoryBySearch = createSelector(
  selectCategories,
  selectFilterCategorySearch,
  (categories, search) =>
    categories.filter((cat) =>
      removeAccents(cat.name)
        .toLowerCase()
        .includes(removeAccents(search).toLowerCase())
    )
);

export const selectSortedProductMapper = createSelector(
  selectProducts,
  ({ data: productMapper }: { data: Record<string, Product[]> }) => {
    const sortedEntries: [string, Product[]][] = Object.entries(productMapper)
      .sort(([keyA, a], [keyB, b]) => {
        if (a.length !== b.length) {
          return b.length - a.length;
        }
        return keyA.localeCompare(keyB);
      })
      .map(([key, value]) => [`cat-${key}`, value]);

    const result: Record<string, Product[]> = Object.fromEntries(sortedEntries);
    return result;
  }
);
