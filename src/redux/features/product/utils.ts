import * as actions from "./action";
import type { InitialState } from "./reducer";

export const createProductSuccess = (
  state: InitialState,
  { payload: product }: ReturnType<typeof actions.createProductSuccess>
) => {
  state.productCreate.status = "completed";
  state.productCreate.data = product;
  state.productCreate.error = undefined;

  // todo: add the logic for case no category
  const catId = product.category!.id;
  if (state.filterCategoryIds.includes(catId)) {
    const copyProducts = {
      ...state.products.data,
    };
    const key = product.category?.id ? `cat-${product.category?.id}` : "cat";
    copyProducts[key] = [product, ...copyProducts[key]];
    state.products.data = {
      [key]: copyProducts[key],
      ...copyProducts,
    };
    return;
  }
};

export const editProductSuccess = (
  state: InitialState,
  { payload: product }: ReturnType<typeof actions.createProductSuccess>
) => {
  state.productEdit.status = "completed";
  state.productEdit.data = product;
  state.productEdit.error = undefined;

  const copyProducts = {
    ...state.products.data,
  };
  const key = product.category?.id ? `cat-${product.category?.id}` : "cat";
  copyProducts[key] = copyProducts[key].map((prod) => {
    if (prod.id === product.id) return product;
    return prod;
  });
  state.products.data = copyProducts;
};
