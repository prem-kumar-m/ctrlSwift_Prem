import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    username = "",
    password = "",
    isLoginSuccess = any,
    resendOtpSuccess = any,
    isOtpSuccess = any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.username = username;
      statenew.password = password;
      return statenew;
    }

    case Constants.LOGIN_PAGE_RESPONSE: {
      console.log("isLoginSuccess" + isLoginSuccess);
      const statenew = { ...state };
      statenew.isLoginSuccess = isLoginSuccess;
      return statenew;
    }

    case Constants.LOGIN_RESEND_OTP_RESPONSE: {
      console.log("resendOtpSuccess\n" + JSON.stringify(resendOtpSuccess));
      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    case Constants.RESPONCES_OTP_LOGIN: {
      console.log("isOtpSuccess\n" + JSON.stringify(isOtpSuccess));
      const statenew = { ...state };
      statenew.isOtpSuccess = isOtpSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
