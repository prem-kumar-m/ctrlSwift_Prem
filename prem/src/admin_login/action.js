import * as Constants from "../constants";

export const loginPageData = (state) => ({
  type: Constants.LOGIN_PAGE_DATA,
  url: Constants.API_URLS.LOGIN_SUCCESS_URL,
  state,
});

export const verifyLogin = (username, password) => ({
  type: Constants.VERIFY_LOGIN, //this will match with your saga
  url: Constants.API_URLS.LOGIN_VERIFY_URL,
  username,
  password,
});

export const verifyLoginResponse = (isLoginSuccess) => ({
  type: Constants.LOGIN_PAGE_RESPONSE,
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
  console.log("testing 2"),
  {
    type: Constants.LOGIN_RESEND_OTP_VERIFY, //this will match with your saga
    url: Constants.API_URLS.LOGIN_RESEND_OTP_URL,
    email,
  }
);

export const resendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.LOGIN_RESEND_OTP_RESPONSE,
  resendOtpSuccess,
});
