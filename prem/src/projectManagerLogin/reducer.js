import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    username = "",
    accountName = "",
    siteName = "",
    planActivateStaus = "",
    password = "",
    isLoginSuccess = any,
    resendOtpSuccess = any,
    isOtpSuccess = any,
    planList = any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.username = username;
      statenew.password = password;
      return statenew;
    }

    case Constants.PROJECT_MANAGER_LOGIN_PAGE_RESPONSE: {
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

    case Constants.YET_TO_INITIATE_DETAILS_RESPONCES: {
      console.log(" planDetails in reducer layer " + JSON.stringify(planList));
      const statenew = { ...state };
      statenew.planList = planList;
      return statenew;
    }

    case Constants.ACCOUNT_NAME_RESPONCES: {
      console.log(
        " accountName in reducer layer " + JSON.stringify(accountName)
      );
      const statenew = { ...state };
      statenew.accountName = accountName;
      return statenew;
    }

    case Constants.SITE_NAME_RESPONCES: {
      console.log(" siteName in reducer layer " + JSON.stringify(siteName));
      const statenew = { ...state };
      statenew.siteName = siteName;
      return statenew;
    }

    case Constants.RESPONCES_FOR_ACTIVATE_PLAN_BY_PROJECT_MANAGE: {
      console.log(
        " planActivateStaus in reducer layer " +
          JSON.stringify(planActivateStaus)
      );
      const statenew = { ...state };
      statenew.planActivateStaus = planActivateStaus;
      return statenew;
    }

    default:
      return state;
  }
};
