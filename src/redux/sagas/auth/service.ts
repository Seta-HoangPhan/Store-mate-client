import { axiosPost } from "axiosClient";

export const login = (data: { phone: string; password: string }) => {
  return axiosPost({ path: "/auth/login", data });
};
