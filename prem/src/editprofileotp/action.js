import * as Constants from "../constants";

console.log("actioncheckingg");
export const validateOtpData = (state) => ({
  type: Constants.VALIDATE_OTP_DATE,
  url: Constants.API_URLS.OTP_SUCCESS_URL,
  state,
});

export const verifyValidateOtp = (email, otp) => ({
  type: Constants.VERIFY_OTP_REGISTER,
  url: Constants.API_URLS.VERIFY_OTP_REGISTER_URL,
  email,
  otp,
});

export const verifyValidateOtpResponse = (isValidatdOtpSuccess) => ({
  type: Constants.VERIFY_OTP_REGISTER_RESPONSE,
  isValidatdOtpSuccess,
});

export const updateUser = (
  firstName,
  lastName,
  email,
  department,
  mobileCountryCode,
  mobile,
  landlineCountryCode,
  landLine,
  company,
  address,
  country,
  city,
  pincode,
  transferemail,
  num,
  otp
) => (
  console.log(transferemail),
  {
    type: Constants.EDIT_PROFILE_UPDATE,
    url: Constants.API_URLS.EDIT_PROFILE_UPDATE_URL,
    firstName,
    lastName,
    email,
    department,
    mobileCountryCode,
    mobile,
    landlineCountryCode,
    landLine,
    company,
    address,
    country,
    city,
    pincode,
    transferemail,
    num,
    otp,
  }
);

export const updateUserResponse = (isUpdateSuccess) => ({
  type: Constants.EDIT_PROFILE_UPDATE_RESPONSE,
  isUpdateSuccess,
});

export const resendOtp = (email) => ({
  type: Constants.EDIT_RESEND_OTP,
  url: Constants.API_URLS.EDIT_RESEND_OTP_URL,
  email,
});

export const resendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.EDIT_RESEND_OTP_RESPONSE,
  resendOtpSuccess,
});
