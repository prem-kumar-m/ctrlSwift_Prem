import * as Constants from "../../constants";



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

export const verifyEmailCustomer = (getmail) => ({
  type: Constants.FORGOTPASSWORD_CUSTOMER_DATA,
  url: Constants.API_URLS.FORGOTPASSWORD_CUSTOMER_URL,
  getmail,
});

export const verifyEmailCustomerResponse = (isEmailVerifySuccess) => ({
  type: Constants.FORGOTPASSWORD_CUSTOMER_RESPONSE,
  isEmailVerifySuccess,
});

export const forgotOtpCustomer = (getmail, otp) => ({
  type: Constants.FORGOTPASSWORD_CUSTOMER_VERIFY_OTP, //this will match with your saga
  url: Constants.API_URLS.VERIFY_CUSTOMER_OTP_URL,
  getmail,
  otp,
});

export const forgotOtpCustomerResponse = (isValidatdOtpSuccess) => ({
  type: Constants.FORGOTPASSWORD_CUSTOMER_VERIFY_OTP_RESPONSE,
  isValidatdOtpSuccess,
});

export const resendOtpCustomer = (getmail, otp) => ({
  type: Constants.LOGIN_RESENDOTP_CUSTOMER_VERIFY, //this will match with your saga
  url: Constants.API_URLS.LOGIN_RESENDOTP_CUSTOMER_URL,
  getmail,
  otp,
});

export const resendOtpCustomerResponse = (resendOtpSuccess) => ({
  type: Constants.LOGIN_RESENDOTP_CUSTOMER_RESPONSE,
  resendOtpSuccess,
});

export const newPasswordCustomer = (getmail, newpassword) => ({
  type: Constants.RESETPASSWORD_CUSTOMER_DATA, //this will match with your saga
  url: Constants.API_URLS.RESETPASSWORD_CUSTOMER_URL,
  getmail,
  newpassword,
});

export const newPasswordCustomerResponse = (isnewPasswordSuccess) => ({
  type: Constants.RESETPASSWORD_CUSTOMER_RESPONCES,
  isnewPasswordSuccess,
});
