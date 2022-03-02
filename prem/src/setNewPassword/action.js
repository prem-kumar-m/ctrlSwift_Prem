import * as Constants from "../constants";
export const verifyEmail = (email) => (
  console.log("====in action forgot password==="),
  {
    type: Constants.SNP_EMAIL_DATA,
    url: Constants.API_URLS.SNP_VERIFY_EMAIL_URL,
    email,
  }
);

export const verifyEmailResponse = (isVerifySuccess) => (
  console.log("====in action forgot password response==="),
  {
    type: Constants.SNP_EMAIL_DATA_RESPONSE,
    isVerifySuccess,
  }
);

export const verifyOtp = (email, sendOtp) => (
  console.log("====in action forgot password==="),
  {
    type: Constants.SNP_VERIFY_OTP, //this will match with your saga
    url: Constants.API_URLS.SNP_VERIFY_OTP_URL,
    email,
    sendOtp,
  }
);

export const verifyOtpResponse = (isValidatdOtpSuccess) => (
  console.log("====in action forgot password response==="),
  {
    type: Constants.SNP_VERIFY_OTP_RESPONSE,
    isValidatdOtpSuccess,
  }
);

export const resendOtp = (email) => ({
  type: Constants.SNP_VERIFY_RESENDOTP, //this will match with your saga
  url: Constants.API_URLS.SNP_RESENDOTP_URL,
  email,
});

export const resendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.SNP_VERIFY_RESENDOTP_RESPONSE,
  resendOtpSuccess,
});

export const newPasswordData = (email, newPassword) => ({
  type: Constants.SNP_VERIFY_NEWPASSWORD, //this will match with your saga
  url: Constants.API_URLS.SNP_NEWPASSWORD_URL,
  email,
  newPassword,
});

export const newPasswordDataResponse = (newPasswordSuccess) => (
  console.log("---action" + JSON.stringify(newPasswordSuccess)),
  {
    type: Constants.SNP_VERIFY_NEWPASSWORD_RESPONSE,
    newPasswordSuccess,
  }
);
