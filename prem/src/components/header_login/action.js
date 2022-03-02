import * as Constants from "../../constants";

// export const callCenterLoginPageData = state => ({
//   type: Constants.CALL_CENTER_LOGIN_PAGE_DATA,
//   url: Constants.API_URLS.CALL_CENTER_LOGIN_SUCCESS_URL,
//   state,
// });

export const clearTokensCustomer = () => ({
  type: Constants.REQ_CLEAR_ACCESS_TOKENS_CUSTOMER,
  URL: Constants.API_URLS.REQ_CLEAR_TOKENS_CUSTOMER_URL,
});

export const recClearAccessTokensCustomer = (doClearTokens) => ({
  type: Constants.REC_CLEAR_ACCESS_TOKENS_CUSTOMER,
  doClearTokens,
});
