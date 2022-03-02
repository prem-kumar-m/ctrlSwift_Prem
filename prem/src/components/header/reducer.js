import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    email = "",
    password = "",
    isLoginSuccess = any,
    doClearTokens = any,
    isEmailVerifySuccess = any,
    resendOtpSuccess = any,
    isValidatdOtpSuccess = any,
    isnewPasswordSuccess = any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.email = email;
      statenew.password = password;
      return statenew;
    }

    case Constants.CUSTOMER_LOGIN_PAGE_RESPONSE: {
      console.log("isLoginSuccess" + JSON.stringify(isLoginSuccess));
      const statenew = { ...state };
      statenew.isLoginSuccess = isLoginSuccess;
      return statenew;
    }

 

    case Constants.REC_CLEAR_ACCESS_TOKENS_CUSTOMER: {
      console.log(
        "Got the clear access tokens response.'" + JSON.stringify(doClearTokens)
      );
      const statenew = { ...state };
      statenew.doClearTokens = doClearTokens;
      return statenew;
    }

    case Constants.FORGOTPASSWORD_CUSTOMER_RESPONSE: {
      console.log(
        "isEmailVerifySuccess \n" + JSON.stringify(isEmailVerifySuccess)
      );
      const statenew = { ...state };
      statenew.isEmailVerifySuccess = isEmailVerifySuccess;
      return statenew;
    }

    case Constants.FORGOTPASSWORD_CUSTOMER_VERIFY_OTP_RESPONSE: {
      const statenew = { ...state };

      statenew.isValidatdOtpSuccess = isValidatdOtpSuccess;

      return statenew;
    }

    case Constants.LOGIN_RESENDOTP_CUSTOMER_RESPONSE: {
      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    case Constants.RESETPASSWORD_CUSTOMER_RESPONCES: {
      const statenew = { ...state };
      statenew.isnewPasswordSuccess = isnewPasswordSuccess;

      return statenew;
    }

    default:
      return state;
  }
};
