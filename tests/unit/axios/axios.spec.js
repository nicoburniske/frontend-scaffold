/* eslint-disable no-unused-vars */

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { refreshToken, createRequestInterceptor, createResponseInterceptor } from '../../../src/axios/axiosInstance';
import { API_USER } from '../../../src/api/endpoints';

describe('axios interceptor tests', () => {
  // init axios instance
  const testAxios = axios.create();
  createRequestInterceptor(testAxios);
  createResponseInterceptor(testAxios, refreshToken);
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(testAxios);
  });

  afterEach(() => {
    mock.restore();
    localStorage.clear();
  });

  /**
   * This is the only test right now that I'd say works as intended. They other 2 have quirks 
   * that'll break them.
   */
  test('1. failed request with 401 response, successful refresh, and successful rerequest',
    async (done) => {
      // setup
      mock.onGet().replyOnce(401, {})
        .onPost().replyOnce(201, { access_token: 'an access token' })
        .onGet()
        .replyOnce(config => [201, 
          { user: { username: 'Nick' },
            requestHeaders: config.headers}]);

      // execute
      const response = await testAxios.get(API_USER);
      expect(localStorage.getItem('access_token')).toBe('an access token');
      expect(response.data.requestHeaders['X-Access-Token']).toBe('an access token');
      expect(response.data.user.username).toBe('Nick');
      done();
    });

  /**
     * request should not be retried since an access token was not retrieved.
     * pt. 1: Checks that the interceptor is ejeceted properly.
     * pt. 2: Checks that interceptor has been reinserted into axiosInstance. <-- doesn't work yet
     * We are expecting the same behavior as test #1.
     */
  test('2. failed request with 401 response, failed refresh with 401 response, no loop, interceptor remains intact',
    async (done) => {
      // pt. 1
      // setup
      mock.onGet().replyOnce(401, {}) // initial request is unauthorized
        .onPost().replyOnce(401, {}) // token refresh request returns 401
        .onGet().replyOnce(401, {})
        .onPost().replyOnce(201, { access_token: 'an access token' })
        .onGet()
        .replyOnce(config => [201, 
          { user: { username: 'Nick' },
            requestHeaders: config.headers}]);
      // execute
      testAxios.get(API_USER).catch(() => {
        expect.assertions(2);
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.post.length).toBe(1);
        done();
      });
      // const response = await testAxios.get(API_USER);
      // expect(localStorage.getItem('access_token')).toBe('an access token');
      // expect(response.data.requestHeaders['X-Access-Token']).toBe('an access token');
      // expect(response.data.user.username).toBe('Nick');
    });

  test('3. ensure that request interceptor is including latest access_token in request header',
    async (done) => {
      // setup
      localStorage.setItem('access_token', 'first access token');
      mock.onGet().replyOnce(config => [401, { requestHeaders: config.headers }])
        .onPost().replyOnce(201, { access_token: 'second access token' })
        .onGet().reply(config => [200, { requestHeaders: config.headers }]);

      // console.log(mock.history.post);
      const response1 = await testAxios.get(API_USER);
      expect(response1.data.requestHeaders['X-Access-Token']).toBe('second access token');
      expect(mock.history.get.length).toBe(2);
      expect(mock.history.post.length).toBe(1);
      expect(mock.history.post[0].headers['X-Access-Token']).toBe('first access token');
      done();
    });
});
