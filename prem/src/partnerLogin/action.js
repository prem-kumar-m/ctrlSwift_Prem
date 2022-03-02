import * as Constants from "../constants";

export const verifyPartnerLogin = (email, password) => (
  console.log("action"),
  {
    type: Constants.VERIFY_PARTNER_LOGIN, //this will match with your saga
    url: Constants.API_URLS.PARTNER_LOGIN_VERIFY_URL,
    email,
    password,
  }
);

export const verifyPartnerLoginResponse = (isLoginSuccess) => (
  console.log("actionResponse" + JSON.stringify(isLoginSuccess.Success)),
  console.log("response coming"),
  {
    type: Constants.PARTNER_LOGIN_PAGE_RESPONSE,
    isLoginSuccess,
  }
);
export const partnerOtpVerify = (otp) => (
  console.log("=======sending Otp==========" + JSON.stringify(otp)),
  {
    type: Constants.PARTNER_VERIFY_OTP_LOGIN, //this will match with your saga
    url: Constants.API_URLS.PARTNER_LOGIN_VERIFY_OTP_URL,

    otp,
  }
);

export const partnerOtpVerifyResponse = (isOtpSuccess) => (
  console.log(
    "===========reponse otp ===================" + JSON.stringify(isOtpSuccess)
  ),
  {
    type: Constants.PARTNER_RESPONCES_OTP_LOGIN,
    isOtpSuccess,
  }
);

export const partnerResendOtp = (email) => (
  console.log("testing 2"),
  {
    type: Constants.PARTNER_LOGIN_RESEND_OTP_VERIFY, //this will match with your saga
    url: Constants.API_URLS.LOGIN_RESEND_OTP_URL_PARTNER,
    email,
  }
);
export const partnerResendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.PARTNER_LOGIN_RESEND_OTP_RESPONSE,
  resendOtpSuccess,
});

export const verifyPartnerForgot = (forgotEmail) => (
  console.log("====in action forgot password==="+forgotEmail),
  {
    type: Constants.PARTNER_FORGOTPASSWORD_DATA,
    url: Constants.API_URLS.PARTNER_FORGOTPASSWORD_URL,
    forgotEmail,
  }
);

export const verifyPartnerForgotResponse = (isVerifySuccess) => (
  console.log("====in action forgot password response==="),
  {
    type: Constants.PARTNER_FORGOTPASSWORD_RESPONSE,
    isVerifySuccess,
  }
);

export const verifyForgotOtp = (forgotEmail, sendOtp) => (
  console.log("====in action forgot password==="),
  {
    type: Constants.PARTNER_FORGOTPASSWORD_VERIFY_OTP, //this will match with your saga
    url: Constants.API_URLS.PARTNER_VERIFY_OTP_URL,
    forgotEmail,
    sendOtp,
  }
);

export const verifyForgotOtpResponse = (isValidatdOtpSuccess) => (
  console.log("====in action forgot password response==="),
  {
    type: Constants.PARTNER_FORGOTPASSWORD_VERIFY_OTP_RESPONSE,
    isValidatdOtpSuccess,
  }
);

export const forgotResendOtp = (forgotEmail) => ({
  type: Constants.PARTNER_RESENDOTP_VERIFY, //this will match with your saga
  url: Constants.API_URLS.PARTNER_RESENDOTP_URL,
  forgotEmail,
});

export const forgotResendOtpResponse = (forgotResendOtpSuccess) => ({
  type: Constants.PARTNER_RESENDOTP_RESPONSE,
  forgotResendOtpSuccess,
});

export const newPasswordData = (forgotEmail, newPassword) => ({
  type: Constants.PARTNER_NEWPASSWORD_VERIFY, //this will match with your saga
  url: Constants.API_URLS.PARTNER_NEWPASSWORD_URL,
  forgotEmail,
  newPassword,
});

export const newPasswordDataResponse = (newPasswordSuccess) => (
  console.log("---action"+ JSON.stringify(newPasswordSuccess)),
  {
  type: Constants.PARTNER_NEWPASSWORD_RESPONSE,
  newPasswordSuccess,
});
