import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    plan="",
    paymentTerms="",
    isSuccess=any,
   
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.plan = plan;
      statenew.paymentTerms = paymentTerms;
    
      return statenew;
    }

    case Constants.REQUEST_PLAN_PRICE_RESPONSE:
     // console.log("++++++++" + JSON.stringify(isSuccess) )
      {
        const statenew = { ...state };
        statenew.isSuccess = isSuccess;
        return statenew;
      }

    default:
      return state;
  }
};
