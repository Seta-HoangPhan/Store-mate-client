import type { Category } from "@typings/redux";

export type ApiResponse<T> = [T | null, string | null];

export interface RefreshTokenRes {
  data: {
    accessToken: string;
  };
}

export interface CategoryRes {
  data: Category[];
}
