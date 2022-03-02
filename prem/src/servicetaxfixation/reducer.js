import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    Taxs = [],
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

    case Constants.ALL_TAX_RESPONSE: {
      console.log("responces" + JSON.stringify(Taxs));
      const statenew = { ...state };
      statenew.Taxs = Taxs;
      return statenew;
    }
    case Constants.ADD_TAXS_RESPONSE: {
      console.log("Add User Reducer is Add User Success " + isSuccess);
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

    case Constants.DELETE_TAXS_RESPONSE_BY_COUNTRY: {
      console.log(
        "Delete User Success in reducer....... " + JSON.stringify(isSuccess)
      );
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
