export function getPayload (token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export function getTokenHeader (token) {
  try {
    return JSON.parse(atob(token.split('.')[0]));
  } catch (e) {
    return null;
  }
}