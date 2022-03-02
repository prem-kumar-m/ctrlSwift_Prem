import * as Constants from "../constants";
import { any } from "prop-types";
import discount from ".";

export default (
  state = {},
  {
    type,
    Discount = [],
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

    case Constants.ALL_DISCOUNT_RESPONSE: {
      console.log("responces" + JSON.stringify(Discount));
      const statenew = { ...state };
      statenew.Discount = Discount;
      return statenew;
    }
    case Constants.ADD_DISCOUNT_RESPONSE: {
      console.log("Add User Reducer is Add User Success " + isSuccess);
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
