import * as Constants from "../constants";
import { any } from "prop-types";

export default (state = {}, { type, isSuccess = any }) => {
  switch (type) {
    case Constants.RESPONSE_CONTACT_US: {
      const statenew = { ...state };
      console.log("details" + isSuccess);

      statenew.isSuccess = isSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
