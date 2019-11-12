/* eslint-disable newline-per-chained-call */
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

  test('1. failed request with 401 response, successful refresh, and successful rerequest',
    async (done) => {
      expect.assertions(3);
      // setup
      mock.onGet().replyOnce(401, {})
        .onPost().replyOnce(201, { access_token: 'an access token' })
        .onGet().replyOnce(config => [201,
          {
            user: { username: 'Nick' },
            requestHeaders: config.headers,
          }]);

      // execute
      const response = await testAxios.get(API_USER);
      expect(localStorage.getItem('access_token')).toBe('an access token');
      expect(response.data.requestHeaders['X-Access-Token']).toBe('an access token');
      expect(response.data.user.username).toBe('Nick');
      done();
    });

  /**
     * request should not be retried since an access token was not retrieved.
     * pt. 1: Checks that the interceptor is ejected properly.
     * pt. 2: Checks that interceptor has been reinserted into axiosInstance.
     * We are expecting the same behavior as test #1.
     */
  test('2. failed request with 401 response, failed refresh with 401 response, no loop, interceptor remains intact',
    async (done) => {
      expect.assertions(5);
      // pt. 1
      // setup
      mock.onGet().replyOnce(401, {}) // initial request is unauthorized
        .onPost().replyOnce(401, {}); // token refresh request returns 401
      // execute
      await testAxios.get(API_USER).catch(() => {
        expect(mock.history.get.length).toBe(1);
        expect(mock.history.post.length).toBe(1);
      });

      // pt.2
      // setup
      mock.onGet().replyOnce(401, {})
        .onPost().replyOnce(201, { access_token: 'an access token' })
        .onGet().replyOnce(config => [201,
          {
            user: { username: 'Nick' },
            requestHeaders: config.headers,
          }]);
      // execute
      try {
        const response = await testAxios.get(API_USER);
        expect(localStorage.getItem('access_token')).toBe('an access token');
        expect(response.data.requestHeaders['X-Access-Token']).toBe('an access token');
        expect(response.data.user.username).toBe('Nick');
        done();
      } catch (error) {
        done.fail();
      }
    });

  // I believe there is a bug in the axios-mock-adapter history property.
  // It overwrites the headers of the requests when there are chained axios requests.
  // cannot use history to test request config history.
  // Could be due to the rerequest of same config with updated header in response interceptor?
  test('3. POSSIBLE axios-mock-adapter BUG',
    async (done) => {
      // setup
      localStorage.setItem('access_token', 'first access token');
      mock.onGet().replyOnce(401, {})
        .onPost().replyOnce(201, { access_token: 'second access token' })
        .onGet().replyOnce(config => [200, { requestHeaders: config.headers }])
        .onGet().replyOnce(401, {})
        .onPost().replyOnce(201, { access_token: 'third access token' })
        .onGet().replyOnce(config => [200, { requestHeaders: config.headers }]);

      // console.log(localStorage.getItem('access_token'));
      const response1 = await testAxios.get(API_USER);
      expect(response1.data.requestHeaders['X-Access-Token']).toBe('second access token');
      expect(mock.history.get.length).toBe(2);
      expect(mock.history.post.length).toBe(1);
      // expect below shows bug. Should be expecting 'first access token'
      expect(mock.history.get[0].headers['X-Access-Token']).toBe('second access token');

      // console.log(localStorage.getItem('access_token'));
      const response2 = await testAxios.get(API_USER);
      expect(response2.data.requestHeaders['X-Access-Token']).toBe('third access token');
      expect(mock.history.get.length).toBe(4);
      expect(mock.history.post.length).toBe(2);
      // expect below shows bug. Should be expecting 'second access token'
      expect(mock.history.get[2].headers['X-Access-Token']).toBe('third access token');
      done();
    });

  test('4. ensure that request interceptor is including latest access_token in request header',
    async (done) => {
      expect.assertions(3);
      // setup
      mock.onGet().reply(config => [200, { requestHeaders: config.headers }]);
      // execute
      localStorage.setItem('access_token', 'first access token');
      const response1 = await testAxios.get(API_USER);
      expect(response1.data.requestHeaders['X-Access-Token']).toBe('first access token');

      localStorage.setItem('access_token', 'second access token');
      const response2 = await testAxios.get(API_USER);
      expect(response2.data.requestHeaders['X-Access-Token']).toBe('second access token');

      localStorage.setItem('access_token', 'third access token');
      const response3 = await testAxios.get(API_USER);
      expect(response3.data.requestHeaders['X-Access-Token']).toBe('third access token');
      done();
    });
});
