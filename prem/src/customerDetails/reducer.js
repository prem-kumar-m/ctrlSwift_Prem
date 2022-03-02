import * as Constants from "../constants";
import { any } from "prop-types";

export default (state = {}, { type, planList = any }) => {
  switch (type) {
    case Constants.PLAN_DETAILS_RESPONCES: {
      console.log(" planDetials in reducer layer " + JSON.stringify(planList));
      const statenew = { ...state };
      statenew.planList = planList;
      return statenew;
    }

    default:
      return state;
  }
};
