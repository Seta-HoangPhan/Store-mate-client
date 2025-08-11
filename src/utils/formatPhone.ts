import { AsYouType } from "libphonenumber-js";

export const formatPhoneNumber = (phone: string, ignorePredix?: boolean) => {
  const formater = new AsYouType("VN");
  const formated = formater.input(phone);

  if (ignorePredix) {
    return formated || "";
  }
  return formated ? `+84 ${formated}` : "";
};
