import type { Category } from "@typings/redux";

const STORAGE_KEY = "filterCategories";

export const getFilterCategoriesLS = (): Category[] => {
  const cats = localStorage.getItem(STORAGE_KEY);
  try {
    if (!cats) {
      return [];
    }
    return JSON.parse(cats);
  } catch (error) {
    console.error("parse filter categories failed: ", error);
    throw new Error("Some thing went wrong!");
  }
};

export const setFilterCategoriesLS = (cats: Category[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cats));
};
