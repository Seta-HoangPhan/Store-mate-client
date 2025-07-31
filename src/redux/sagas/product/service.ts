import type { CategoryRes } from "@typings/apiResponse";
import { axiosGet } from "../../../axiosClient";
import { get } from "lodash";

export const fetchAllProducts = async () => {
  const [data, err] = await axiosGet<CategoryRes>("/products");
  if (data) {
    return [data.data, null];
  } else {
    return [null, get(err, "detail", "Fetch products failed!")];
  }
};
