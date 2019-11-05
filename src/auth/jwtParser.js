export function getTokenPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export function getTokenHeader(token) {
  try {
    return JSON.parse(atob(token.split('.')[0]));
  } catch (e) {
    return null;
  }
}

export function isJWTValid(jwt) {
  const body = getTokenPayload(jwt);
  const now = new Date();
  return body !== null && body.expiration < now.getTime();
}
