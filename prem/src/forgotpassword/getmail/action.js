import * as Constants from "../../constants";

export const verifyEmail = (email) => ({
  type: Constants.FORGOTPASSWORD_DATA,
  url: Constants.API_URLS.FORGOTPASSWORD_URL,
  email,
});

export const verifyEmailResponse = (isVerifySuccess) => ({
  type: Constants.FORGOTPASSWORD_RESPONSE,
  isVerifySuccess,
});
