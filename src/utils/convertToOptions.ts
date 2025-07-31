import type { Option } from "@components/MultiSelect";

type Data<T> = T & {
  id: number | string;
  name: string;
};

export const convertToOptions = <T>(data: Data<T>[]): Option[] =>
  data.map((item) => ({
    id: item.id.toString(),
    label: item.name,
  }));
