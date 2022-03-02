import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  { type, email = "", password = "", isLoginSuccess = any, doClearTokens = any }
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
      console.log("Got the clear access tokens response.");
      const statenew = { ...state };
      statenew.doClearTokens = doClearTokens;
      return statenew;
    }
    default:
      return state;
  }
};
