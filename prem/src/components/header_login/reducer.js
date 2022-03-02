import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  { type, email = "", password = "", isLoginSuccess = any, doClearTokens = any }
) => {
  switch (type) {
    case Constants.REC_CLEAR_ACCESS_TOKENS_CUSTOMER: {
      console.log(
        "Got the clear access tokens response.'" + JSON.stringify(doClearTokens)
      );
      const statenew = { ...state };
      statenew.doClearTokens = doClearTokens;
      return statenew;
    }
    default:
      return state;
  }
};
