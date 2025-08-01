export const ACCESS_TOKEN_KEY = "access-token";
export const REFRESH_TOKEN_KEY = "refresh-token";

export const getAccessTokenLS = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const setAccessTokenLS = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const removeAccessTokenLS = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const getRefreshTokenLS = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

export const setRefreshTokenLS = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const removeRefreshTokenLS = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
