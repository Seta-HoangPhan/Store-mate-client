export const cleanFormFieldValue = (value: string) => {
  if (typeof value === "string" && !Number.isNaN(Number(value))) {
    return value.replace(/\./g, "");
  }
  return value;
};
