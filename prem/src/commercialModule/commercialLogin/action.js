import * as Constants from "../../constants";

export const verifycommercialLogin = (email, password) => (
  console.log("action"),
  {
    type: Constants.VERIFY_COMMERCIAL_LOGIN, //this will match with your saga
    url: Constants.API_URLS.COMMERCIAL_LOGIN_VERIFY_URL,
    email,
    password,
  }
);

export const verifycommercialLoginResponse = (isLoginSuccess) => (
  console.log("actionResponse" + JSON.stringify(isLoginSuccess.Success)),
  console.log("response coming"),
  {
    type: Constants.COMMERCIAL_LOGIN_PAGE_RESPONSE,
    isLoginSuccess,
  }
);
export const commercialOtpVerify = (otp) => (
  console.log("=======sending Otp==========" + JSON.stringify(otp)),
  {
    type: Constants.COMMERCIAL_VERIFY_OTP_LOGIN, //this will match with your saga
    url: Constants.API_URLS.COMMERCIAL_LOGIN_VERIFY_OTP_URL,

    otp,
  }
);

export const commercialOtpVerifyResponse = (isOtpSuccess) => (
  console.log(
    "===========reponse otp ===================" + JSON.stringify(isOtpSuccess)
  ),
  {
    type: Constants.COMMERCIAL_RESPONCES_OTP_LOGIN,
    isOtpSuccess,
  }
);

export const commercialResendOtp = (email) => (
  console.log("testing 2"),
  {
    type: Constants.COMMERCIAL_LOGIN_RESEND_OTP_VERIFY, //this will match with your saga
    url: Constants.API_URLS.LOGIN_RESEND_OTP_URL_COMMERCIAL,
    email,
  }
);
export const commercialResendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.COMMERCIAL_LOGIN_RESEND_OTP_RESPONSE,
  resendOtpSuccess,
});

export const verifycommercialForgot = (forgotEmail) => (
  console.log("====in action forgot password==="+forgotEmail),
  {
    type: Constants.COMMERCIAL_FORGOTPASSWORD_DATA,
    url: Constants.API_URLS.COMMERCIAL_FORGOTPASSWORD_URL,
    forgotEmail,
  }
);

export const verifycommercialForgotResponse = (isVerifySuccess) => (
  console.log("====in action forgot password response==="),
  {
    type: Constants.COMMERCIAL_FORGOTPASSWORD_RESPONSE,
    isVerifySuccess,
  }
);

export const verifyForgotOtp = (forgotEmail, sendOtp) => (
  console.log("====in action forgot password==="),
  {
    type: Constants.COMMERCIAL_FORGOTPASSWORD_VERIFY_OTP, //this will match with your saga
    url: Constants.API_URLS.COMMERCIAL_VERIFY_OTP_URL,
    forgotEmail,
    sendOtp,
  }
);

export const verifyForgotOtpResponse = (isValidatdOtpSuccess) => (
  console.log("====in action forgot password response==="),
  {
    type: Constants.COMMERCIAL_FORGOTPASSWORD_VERIFY_OTP_RESPONSE,
    isValidatdOtpSuccess,
  }
);

export const forgotResendOtp = (forgotEmail) => ({
  type: Constants.COMMERCIAL_RESENDOTP_VERIFY, //this will match with your saga
  url: Constants.API_URLS.COMMERCIAL_RESENDOTP_URL,
  forgotEmail,
});

export const forgotResendOtpResponse = (forgotResendOtpSuccess) => ({
  type: Constants.COMMERCIAL_RESENDOTP_RESPONSE,
  forgotResendOtpSuccess,
});

export const newPasswordData = (forgotEmail, newPassword) => ({
  type: Constants.COMMERCIAL_NEWPASSWORD_VERIFY, //this will match with your saga
  url: Constants.API_URLS.COMMERCIAL_NEWPASSWORD_URL,
  forgotEmail,
  newPassword,
});

export const newPasswordDataResponse = (newPasswordSuccess) => (
  console.log("---action"+ JSON.stringify(newPasswordSuccess)),
  {
  type: Constants.COMMERCIAL_NEWPASSWORD_RESPONSE,
  newPasswordSuccess,
});
