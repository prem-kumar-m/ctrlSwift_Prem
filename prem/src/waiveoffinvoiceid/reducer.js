import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    invoiceSuccess = "",
    otpsuccess = "",
    isLoginSuccess = any,
    doClearTokens = any,
  }
) => {
  switch (type) {
    case Constants.RESPONSE_INVOICE:
      {
        console.log("invoiceSuccess" + JSON.stringify(invoiceSuccess));
        const statenew = { ...state };
        statenew.invoiceSuccess = invoiceSuccess;

        return statenew;
      }

      {
        /*case Constants.REC_CLEAR_ACCESS_TOKENS_CUSTOMER: {
      console.log('Got the clear access tokens response.');
      const statenew = {...state};
      statenew.doClearTokens = doClearTokens;
      return statenew;
    } */
      }
    default:
      return state;
  }
};
