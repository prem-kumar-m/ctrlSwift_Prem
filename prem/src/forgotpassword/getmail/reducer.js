import * as Constants from "../../constants";
import { any } from "prop-types";

export default (state = {}, { type, email = "", isVerifySuccess = any }) => {
  switch (type) {
    case Constants.RECEIVE_FORGOTPASSWORD: {
      const statenew = { ...state };
      statenew.email = email;
      return statenew;
    }

    case Constants.FORGOTPASSWORD_RESPONSE: {
      const statenew = { ...state };
      statenew.isVerifySuccess = isVerifySuccess;
      return statenew;
    }
    default:
      return state;
  }
};
