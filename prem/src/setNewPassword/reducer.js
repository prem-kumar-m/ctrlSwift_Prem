import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    email = "",
    isVerifySuccess = any,
    isValidatdOtpSuccess = any,
    resendOtpSuccess = any,
    newPasswordSuccess = any,
  }
) => {
  switch (type) {
    case Constants.SNP_EMAIL_RECEIVE: {
      const statenew = { ...state };
      statenew.email = email;
      return statenew;
    }

    case Constants.SNP_EMAIL_DATA_RESPONSE: {
      const statenew = { ...state };
      statenew.isVerifySuccess = isVerifySuccess;
      return statenew;
    }

    case Constants.SNP_VERIFY_OTP_RESPONSE: {
      const statenew = { ...state };
      statenew.isValidatdOtpSuccess = isValidatdOtpSuccess;
      return statenew;
    }

    case Constants.SNP_VERIFY_RESENDOTP_RESPONSE: {
      console.log("===========>reducer" + resendOtpSuccess);

      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    case Constants.SNP_VERIFY_NEWPASSWORD_RESPONSE: {
      console.log("===========>reducer" + newPasswordSuccess);
      const statenew = { ...state };
      statenew.newPasswordSuccess = newPasswordSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
