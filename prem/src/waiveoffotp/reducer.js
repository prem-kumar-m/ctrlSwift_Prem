import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    otpSuccess = "",
    invoiceNumber = "",
    invoiceOtp = "",
    resendOtpSuccess = any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.invoiceNumber = invoiceNumber;
      statenew.invoiceOtp = invoiceOtp;
      return statenew;
    }

    case Constants.RESPONSE_OTP: {
      console.log("otpSuccess" + JSON.stringify(otpSuccess));
      const statenew = { ...state };
      statenew.otpSuccess = otpSuccess;
      return statenew;
    }
    case Constants.RESEND_WAIVEOFF_CODE_RESPONSE: {
      console.log("OTP" + JSON.stringify(resendOtpSuccess));
      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
