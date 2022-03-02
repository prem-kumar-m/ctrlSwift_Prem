import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    email = "",
    otp = "",
    isValidatdOtpSuccess = any,
    resendOtpSuccess = any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.email = email;
      statenew.otp = otp;
      return statenew;
    }

    case Constants.FORGOTPASSWORD_VERIFY_OTP_RESPONSE: {
      const statenew = { ...state };

      statenew.isValidatdOtpSuccess = isValidatdOtpSuccess;

      return statenew;
    }

    case Constants.LOGIN_RESENDOTP_RESPONSE: {
      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
