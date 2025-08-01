import { axiosGet } from "../../../axiosClient";

export const getProfile = () => {
  return axiosGet({ path: "/auth/get-profile" });
};
