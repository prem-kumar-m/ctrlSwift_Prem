import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    Rate = [],
    employeeId = "",
    name = "",
    mobile = "",
    email = "",
    role = "",
    isSuccess = any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.employeeId = employeeId;
      statenew.name = name;
      statenew.mobile = mobile;
      statenew.email = email;
      statenew.role = role;
      return statenew;
    }

    case Constants.ALL_RATE_RESPONSE: {
      console.log("responces" + JSON.stringify(Rate));
      const statenew = { ...state };
      statenew.Rate = Rate;
      return statenew;
    }
    case Constants.ADD_RATE_RESPONSE: {
      console.log("Add User Reducer is Add User Success " + isSuccess);
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
