import * as Constants from "../../constants";

export const validateOtpData = (state) => ({
  type: Constants.VALIDATE_OTP_DATE,
  url: Constants.API_URLS.OTP_SUCCESS_URL,
  state,
});

export const forgotOtp = (email, otp) => ({
  type: Constants.FORGOTPASSWORD_VERIFY_OTP, //this will match with your saga
  url: Constants.API_URLS.VERIFY_OTP_URL,
  email,
  otp,
});

export const forgotOtpResponse = (isValidatdOtpSuccess) => ({
  type: Constants.FORGOTPASSWORD_VERIFY_OTP_RESPONSE,
  isValidatdOtpSuccess,
});

export const resendOtp = (email, otp) => ({
  type: Constants.LOGIN_RESENDOTP_VERIFY, //this will match with your saga
  url: Constants.API_URLS.LOGIN_RESENDOTP_URL,
  email,
  otp,
});

export const resendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.LOGIN_RESENDOTP_RESPONSE,
  resendOtpSuccess,
});
