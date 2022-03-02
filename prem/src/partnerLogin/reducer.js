import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    email = "",
    password = "",
    isLoginSuccess = any,
    isOtpSuccess = any,
    resendOtpSuccess = any,
    otp = "",
    forgotEmail = "",
    isVerifySuccess = any,
    isValidatdOtpSuccess = any,
    forgotResendOtp = any,
    newPasswordSuccess= any,
  }
) => {
  switch (type) {
    case Constants.PARTNER_RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.email = email;
      statenew.password = password;
      return statenew;
    }

    case Constants.PARTNER_LOGIN_PAGE_RESPONSE: {
      console.log("isLoginSuccess ...." + JSON.stringify(isLoginSuccess));
      const statenew = { ...state };
      statenew.isLoginSuccess = isLoginSuccess;
      return statenew;
    }

    case Constants.PARTNER_LOGIN_RESEND_OTP_RESPONSE: {
      console.log("resendOtpSuccess\n" + JSON.stringify(resendOtpSuccess));
      console.log("=========in reducer=========");
      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    case Constants.PARTNER_RESPONCES_OTP_LOGIN: {
      console.log(
        "======================isOtpSuccess\n==================" +
          JSON.stringify(isOtpSuccess)
      );
      const statenew = { ...state };
      statenew.isOtpSuccess = isOtpSuccess;
      return statenew;
    }
    case Constants.PARTNER_RECEIVE_FORGOTPASSWORD: {
      const statenew = { ...state };
      statenew.forgotEmail = forgotEmail;
      return statenew;
    }

    case Constants.PARTNER_FORGOTPASSWORD_RESPONSE: {
      const statenew = { ...state };
      statenew.isVerifySuccess = isVerifySuccess;
      return statenew;
    }

    case Constants.PARTNER_FORGOTPASSWORD_VERIFY_OTP_RESPONSE: {
      const statenew = { ...state };
      statenew.isValidatdOtpSuccess = isValidatdOtpSuccess;
      return statenew;
    }

    case Constants.PARTNER_RESENDOTP_RESPONSE: {
      console.log("===========>reducer"+ forgotResendOtp);

      const statenew = { ...state };
      statenew.forgotResendOtp = forgotResendOtp;
      return statenew;
    }

    case Constants.PARTNER_NEWPASSWORD_RESPONSE: {
      console.log("===========>reducer"+ newPasswordSuccess);
      const statenew = { ...state };
      statenew.newPasswordSuccess = newPasswordSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
