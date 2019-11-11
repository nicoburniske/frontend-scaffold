const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

/**
 * MODULE SUMMARY
 * Used to write, read, and remove tokens from localStorage. Makes our implementation a little
 * more flexible in case we decide to change this.
 */
const tokenService = {
  getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },
  setAccessToken(access) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  },
  removeAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },
  getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setRefreshToken(refresh) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export default tokenService;
