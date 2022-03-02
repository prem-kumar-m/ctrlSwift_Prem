import * as Constants from "../constants";

export const loginPageData = (state) => ({
  type: Constants.LOGIN_PAGE_DATA,
  url: Constants.API_URLS.LOGIN_SUCCESS_URL,
  state,
});

export const verifyLogin = (username, password) => (
  // console.log("testing"),
  {
    type: Constants.PROJECT_MANAGER_VERIFY_LOGIN, //this will match with your saga
    url: Constants.API_URLS.PROJECT_MANAGER_LOGIN_VERIFY_URL,
    username,
    password,
  }
);

export const verifyLoginResponse = (isLoginSuccess) => ({
  type: Constants.PROJECT_MANAGER_LOGIN_PAGE_RESPONSE,
  isLoginSuccess,
});

export const clearTokens = () => ({
  type: Constants.REQ_CLEAR_ACCESS_TOKENS,
  URL: Constants.API_URLS.REQ_CLEAR_TOKENS_URL,
});

export const recClearAccessTokens = (doClearTokens) => ({
  type: Constants.REC_CLEAR_ACCESS_TOKENS,
  doClearTokens,
});

export const otpVerify = (otp) => ({
  type: Constants.VERIFY_OTP_LOGIN, //this will match with your saga
  url: Constants.API_URLS.LOGIN_VERIFY_OTP_URL,
  otp,
});

export const otpVerifyResponse = (isOtpSuccess) => ({
  type: Constants.RESPONCES_OTP_LOGIN,
  isOtpSuccess,
});

export const resendOtp = (email) => (
  // console.log("testing 2"),
  {
    type: Constants.LOGIN_RESEND_OTP_VERIFY, //this will match with your saga
    url: Constants.API_URLS.LOGIN_RESEND_OTP_URL_PARTNER,
    email,
  }
);

export const resendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.LOGIN_RESEND_OTP_RESPONSE,
  resendOtpSuccess,
});

//----------------------------yetToinitiate-------------------
export const planDetailsRequest = (id) => ({
  type: Constants.YET_TO_INITIATE_DETAILS_REQUEST,
  url: Constants.API_URLS.YET_TO_INITIATE_DETAILS_REQUEST_URL,
  id,
});

export const planDetailsResponces = (planList) => ({
  type: Constants.YET_TO_INITIATE_DETAILS_RESPONCES,
  planList,
});

export const getAccountName = (customerId) => ({
  type: Constants.ACCOUNT_NAME_REQUEST,
  url: Constants.API_URLS.ACCOUNT_NAME_REQUEST_URL,
  customerId,
});

export const getAccountNameResponces = (accountName) => ({
  type: Constants.ACCOUNT_NAME_RESPONCES,
  accountName,
});

export const getSiteName = (accountName, customerId) => ({
  type: Constants.SITE_NAME_REQUEST,
  url: Constants.API_URLS.SITE_NAME_REQUEST_URL,
  accountName,
  customerId,
});

export const getSiteNameResponces = (siteName) => ({
  type: Constants.SITE_NAME_RESPONCES,
  siteName,
});

export const requestToActivatePlanByProjectManage = (requestActivatePlan) => ({
  type: Constants.REQUEST_TO_ACTIVATE_PLAN_BY_PROJECT_MANAGE,
  url: Constants.API_URLS.PROJECT_MANAGER_ACTIVATE_PLAN_REQUEST_URL,
  requestActivatePlan,
});

export const responcesForActivatePlanByProjectManage = (planActivateStaus) => ({
  type: Constants.RESPONCES_FOR_ACTIVATE_PLAN_BY_PROJECT_MANAGE,
  planActivateStaus,
});
