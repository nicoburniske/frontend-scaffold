function getTokenPayload(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

function getTokenHeader(token) {
  try {
    return JSON.parse(atob(token.split('.')[0]));
  } catch (e) {
    return null;
  }
}

function isJWTValid(jwt) {
  const body = getTokenPayload(jwt);
  return body !== null && Date.now() < body.expiration;
}

export default { getTokenPayload, getTokenHeader, isJWTValid };
