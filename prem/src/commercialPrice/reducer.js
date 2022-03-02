import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    Price = [],
    employeeId = "",
    name = "",
    mobile = "",
    email = "",
    role = "",
    isSuccess = any,
    variablePriceChnage = any ,
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

    case Constants.ALL_PRICE_RESPONSE: {
      console.log("responces" + JSON.stringify(Price));
      const statenew = { ...state };
      statenew.Price = Price;
      return statenew;
    }
    case Constants.ADD_PRICE_RESPONSE: {
      console.log("Add User Reducer is Add User Success " + isSuccess);
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

    case Constants.RESPONCES_VARIABLE_PRICE: {
      console.log("Add User Reducer is Variable price Success " + variablePriceChnage);
      const statenew = { ...state };
      statenew.variablePriceChnage = variablePriceChnage;
      return statenew;
    }
    default:
      return state;
  }
};
