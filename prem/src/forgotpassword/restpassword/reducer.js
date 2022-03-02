import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  { type, email = "", newpassword = "", isnewPasswordSuccess = any }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.email = email;
      statenew.newpassword = newpassword;
      return statenew;
    }

    case Constants.RESETPASSWORD_RESPONCES: {
      const statenew = { ...state };
      statenew.isnewPasswordSuccess = isnewPasswordSuccess;

      return statenew;
    }
    default:
      return state;
  }
};
