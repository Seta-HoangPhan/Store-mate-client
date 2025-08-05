export const formatVnd = (price: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "decimal",
    currency: "VND",
  }).format(price);
};
