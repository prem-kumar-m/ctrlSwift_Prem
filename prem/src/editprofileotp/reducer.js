import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    email = "",
    mobile = "",
    otp = "",
    firstName = "",
    lastName = "",
    department = "",
    country = "",
    city = "",
    address = "",
    pincode = "",
    company = "",
    mobileCountryCode = "",
    landLine = "",
    landlineCountryCode = "",
    num = "",
    transferemail = "",
    guestId = any,
    isValidatdOtpSuccess = any,
    isUpdateSuccess = any,
    resendOtpSuccess = any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.email = email;
      statenew.mobile = mobile;
      statenew.otp = otp;
      statenew.firstName = firstName;
      statenew.lastName = lastName;
      statenew.department = department;
      statenew.country = country;
      statenew.city = city;
      statenew.company = company;
      statenew.address = address;
      statenew.pincode = pincode;
      statenew.mobileCountryCode = mobileCountryCode;
      statenew.landLine = landLine;
      statenew.landlineCountryCode = landlineCountryCode;
      statenew.num = num;
      statenew.transferemail = transferemail;

      return statenew;
    }

    case Constants.VERIFY_OTP_REGISTER_RESPONSE: {
      console.log("OTP" + JSON.stringify(isValidatdOtpSuccess));
      const statenew = { ...state };
      statenew.isValidatdOtpSuccess = isValidatdOtpSuccess;

      return statenew;
    }

    case Constants.EDIT_RESEND_OTP_RESPONSE: {
      console.log("OTP" + JSON.stringify(resendOtpSuccess));
      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    case Constants.EDIT_PROFILE_UPDATE_RESPONSE: {
      console.log("OTP" + JSON.stringify(isUpdateSuccess));
      const statenew = { ...state };
      statenew.isUpdateSuccess = isUpdateSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
