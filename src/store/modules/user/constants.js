// TODO: rewrite state as an object with 2 fields: request and state.

// Request states
export const TOKEN_REFRESH_REQUEST = 'TOKEN_REFRESH_REQUEST';
export const TOKEN_REFRESH_SUCCESS = 'TOKEN_REFRESH_SUCCESS';
export const TOKEN_REFRESH_FAILURE = 'TOKEN_REFRESH_FAILURE';

// Signup states
export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

// Login states
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// Logout states
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'; // never used

// Persist user states
export const PERSIST_REQUEST = 'PERSIST_REQUEST';
export const PERSIST_SUCCESS = 'PERSIST_SUCCESS';
export const PERSIST_FAILURE = 'PERSIST_FAILURE';
