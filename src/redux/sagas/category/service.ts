import type { CategoryRes } from "@typings/apiResponse";
import { axiosGet } from "../../../axiosClient";
import { get } from "lodash";

export const fetchAllCategories = async () => {
  const [data, err] = await axiosGet<CategoryRes>("/categories");
  if (data) {
    return [data.data, null];
  } else {
    return [null, get(err, "detail", "Fetch categories failed!")];
  }
};

export const fetchCategoryById = async (id: number) => {
  const [data, err] = await axiosGet<CategoryRes>(`/categories/${id}`);
  if (data) {
    return [data.data, null];
  } else {
    return [null, get(err, "detail", "Fetch category failed!")];
  }
};
