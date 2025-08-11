import type { RefreshTokenRes } from "@typings/apiResponse";
import {
  getAccessTokenLS,
  getRefreshTokenLS,
  removeAccessTokenLS,
  removeRefreshTokenLS,
  setAccessTokenLS,
} from "@utils/localStorage/token";
import axios, {
  AxiosError,
  type AxiosResponse as OriginalAxiosResponse,
  type RawAxiosRequestConfig,
} from "axios";
import humps from "humps";
import qs from "qs";
import settings from "./settings";

let isFreshingToken = false;
let failedRequestQueue: {
  resolve: (token: string) => void;
  reject: (reason?: unknown) => void;
}[] = [];

const processQueue = (err: unknown, token: string | null) => {
  failedRequestQueue.forEach((request) => {
    if (token) {
      request.resolve(token);
    } else {
      request.reject(err);
    }
  });

  failedRequestQueue = [];
};

export const axiosClient = axios.create({
  baseURL: settings.apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) => {
    const decamelizedParams = humps.decamelizeKeys(params);
    return qs.stringify(decamelizedParams, { arrayFormat: "repeat" });
  },
  timeout: 10000,
});

axiosClient.interceptors.request.use((config) => {
  const token = getAccessTokenLS();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (config.data instanceof FormData) {
    const newFormData = new FormData();
    for (const [key, value] of config.data.entries()) {
      const newKey = humps.decamelize(key);
      newFormData.append(newKey, value);
    }
    config.data = newFormData;
  } else if (config.data) {
    config.data = humps.decamelizeKeys(config.data);
  }
  if (config.params) {
    config.params = humps.decamelizeKeys(config.params);
  }
  return config;
});

interface AxiosRequestConfig extends RawAxiosRequestConfig {
  _retry?: boolean;
  skipCamelize?: boolean;
}

type AxiosResponse = OriginalAxiosResponse & {
  config: AxiosRequestConfig;
};

axiosClient.interceptors.response.use(
  (res: AxiosResponse) => {
    const shouldSkipCamelize = res.config.skipCamelize;
    if (res.data && typeof res.data === "object" && !shouldSkipCamelize) {
      res.data = humps.camelizeKeys(res.data);
    }
    return res;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isFreshingToken) {
        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            resolve: (token: string) => {
              if (originalRequest.headers) {
                originalRequest.headers["Authorization"] = `Bearer ${token}`;
              }
              resolve(axiosClient(originalRequest));
            },
            reject,
          });
        });
      }

      isFreshingToken = true;

      try {
        const refreshToken = getRefreshTokenLS();
        if (refreshToken) {
          const res = await axios.post<RefreshTokenRes>("/auth/refresh-token", {
            refreshToken,
          });

          const newAccessToken = res.data.data.accessToken;
          setAccessTokenLS(newAccessToken);
          processQueue(null, newAccessToken);
        }
      } catch (error) {
        processQueue(error, null);
        removeAccessTokenLS();
        removeRefreshTokenLS();
        window.location.href = "/login";
        return Promise.reject(error);
      } finally {
        isFreshingToken = false;
      }
    }

    throw error;
  }
);

export const axiosGet = async <T>({
  path,
  params,
  configs,
}: {
  path: string;
  params?: Record<string, unknown>;
  configs?: AxiosRequestConfig;
}): Promise<[T | null, AxiosError | null]> => {
  try {
    const res = await axiosClient.get(path, { params, ...configs });
    return [res.data.data, null];
  } catch (error) {
    if (error instanceof AxiosError) {
      return [null, error.response?.data.detail];
    }
    console.error(`get ${path}`, error);
    throw Error("Something went wrong!");
  }
};

export const axiosPost = async <T>({
  path,
  data,
  configs,
}: {
  path: string;
  data?: unknown;
  configs?: AxiosRequestConfig;
}): Promise<[T | null, AxiosError | null]> => {
  try {
    const res = await axiosClient.post(path, data, configs);
    return [res.data.data, null];
  } catch (error) {
    if (error instanceof AxiosError) {
      return [null, error.response?.data.detail];
    }
    console.error(`get ${path}`, error);
    throw Error("Something went wrong!");
  }
};

export const axiosPut = async <T>({
  path,
  data,
  configs,
}: {
  path: string;
  data?: Record<string, unknown> | FormData;
  configs?: AxiosRequestConfig;
}): Promise<[T | null, AxiosError | null]> => {
  try {
    const res = await axiosClient.put(path, data, configs);
    return [res.data.data, null];
  } catch (error) {
    if (error instanceof AxiosError) {
      return [null, error.response?.data.detail];
    }
    console.error(`get ${path}`, error);
    throw Error("Something went wrong!");
  }
};

export const axiosDelete = async <T>(
  path: string
): Promise<[T | null, AxiosError | null]> => {
  try {
    const res = await axiosClient.delete(path);
    return [res.data.data, null];
  } catch (error) {
    if (error instanceof AxiosError) {
      return [null, error.response?.data.detail];
    }
    console.error(`get ${path}`, error);
    throw Error("Something went wrong!");
  }
};
