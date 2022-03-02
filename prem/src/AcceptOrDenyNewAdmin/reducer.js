import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    clientlist = [],
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

    case Constants.ALL_CLIENTS_RESPONSE: {
      const statenew = { ...state };
      statenew.clientlist = clientlist;
      return statenew;
    }
    case Constants.ADD_CLIENT_RESPONSE: {
      console.log("Add User Reducer is Add User Success " + JSON.stringify(isSuccess) );
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

   
    case Constants.DELETE_CLIENT_RESPONSE: {
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
