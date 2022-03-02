import * as Constants from "../constants";

// export const callCenterLoginPageData = state => ({
//   type: Constants.CALL_CENTER_LOGIN_PAGE_DATA,
//   url: Constants.API_URLS.CALL_CENTER_LOGIN_SUCCESS_URL,
//   state,
// });

export const verifyCredentialCustomer = (email, password) => ({
  type: Constants.VERIFY_CUSTOMER_LOGIN_CREDENTIAL, //this will match with your saga
  url: Constants.API_URLS.CUSTOMER_LOGIN_VERIFY_URL,
  email,
  password,
});

export const verifyCredentialCustomerResponse = (isLoginSuccess) => ({
  type: Constants.CUSTOMER_LOGIN_PAGE_RESPONSE,
  isLoginSuccess,
});

export const clearTokensCustomer = () => ({
  type: Constants.REQ_CLEAR_ACCESS_TOKENS_CUSTOMER,
  URL: Constants.API_URLS.REQ_CLEAR_TOKENS_CUSTOMER_URL,
});

export const recClearAccessTokensCustomer = (doClearTokens) => ({
  type: Constants.REC_CLEAR_ACCESS_TOKENS_CUSTOMER,
  doClearTokens,
});
