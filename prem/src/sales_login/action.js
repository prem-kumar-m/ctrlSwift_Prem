import * as Constants from "../constants";

// export const callCenterLoginPageData = state => ({
//   type: Constants.CALL_CENTER_LOGIN_PAGE_DATA,
//   url: Constants.API_URLS.CALL_CENTER_LOGIN_SUCCESS_URL,
//   state,
// });

export const verifyCredential = (email, password) => ({
  type: Constants.VERIFY_CREDENTIAL, //this will match with your saga
  url: Constants.API_URLS.SALES_LOGIN_VERIFY_URL,
  email,
  password,
});

export const verifyCredentialResponse = (isLoginSuccess) => ({
  type: Constants.CALL_CENTER_LOGIN_PAGE_RESPONSE,
  isLoginSuccess,
});

export const clearTokens = (token) => ({
  type: Constants.REQ_CLEAR_ACCESS_TOKENS,
  URL: Constants.API_URLS.REQ_CLEAR_TOKENS_URL,
  token,
});

export const recClearAccessTokens = (doClearTokens) => ({
  type: Constants.REC_CLEAR_ACCESS_TOKENS,
  doClearTokens,
});
