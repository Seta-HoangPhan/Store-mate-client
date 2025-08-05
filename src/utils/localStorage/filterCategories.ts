const STORAGE_KEY = "filterCategories";

export const getFilterCategoriesLS = (): number[] => {
  const catIds = localStorage.getItem(STORAGE_KEY);
  try {
    if (!catIds) {
      return [];
    }
    return JSON.parse(catIds);
  } catch (error) {
    console.error("parse filter categories failed: ", error);
    throw new Error("Some thing went wrong!");
  }
};

export const setFilterCategoriesLS = (catIds: number[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(catIds));
};
