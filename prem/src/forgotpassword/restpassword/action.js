import * as Constants from "../../constants";

export const validateOtpData = (state) => ({
  type: Constants.VALIDATE_OTP_DATE,
  url: Constants.API_URLS.OTP_SUCCESS_URL,
  state,
});

export const newPassword = (email, newpassword) => ({
  type: Constants.RESETPASSWORD_DATA, //this will match with your saga
  url: Constants.API_URLS.RESETPASSWORD_URL,
  email,
  newpassword,
});

export const newPasswordResponse = (isnewPasswordSuccess) => ({
  type: Constants.RESETPASSWORD_RESPONCES,
  isnewPasswordSuccess,
});
