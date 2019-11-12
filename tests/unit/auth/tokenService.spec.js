import tokenService from '../../../src/auth/tokenService';

const token = 'a token';

beforeEach(() => {
  localStorage.clear();
});

describe('tests for tokenService module', () => {
  test('1. get, set, and remove accessToken', () => {
    expect(tokenService.getAccessToken()).toBe(null);
    tokenService.setAccessToken(token);
    expect(tokenService.getAccessToken()).toBe(token);
    tokenService.removeAccessToken();
    expect(tokenService.getAccessToken()).toBe(null);
  });
  test('2. get, set, and remove refreshToken', () => {
    expect(tokenService.getRefreshToken()).toBe(null);
    tokenService.setRefreshToken(token);
    expect(tokenService.getRefreshToken()).toBe(token);
    tokenService.removeRefreshToken();
    expect(tokenService.getRefreshToken()).toBe(null);
  });
});
