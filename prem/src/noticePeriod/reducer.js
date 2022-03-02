import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    noticePeriodList = [],
    employeeId = "",
    name = "",
    mobile = "",
    email = "",
    role = "",
    isSuccess = any,
  }
) => {
  switch (type) {
    //case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
    //   const statenew = {...state};
    //   statenew.employeeId= employeeId;
    //   statenew.name = name ;
    //   statenew.mobile = mobile;
    //   statenew.email = email;
    //   statenew.role = role;
    //   return statenew;
    // }

    case Constants.ALL_NOTICE_PERIOD_RESPONSE: {
      console.log("responces" + JSON.stringify(noticePeriodList));
      const statenew = { ...state };
      statenew.noticePeriodList = noticePeriodList;
      return statenew;
    }
    case Constants.UPDATE_NOTICE_PERIOD_RESPONSE: {
      console.log("Add User Reducer is Add User Success " + isSuccess);
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

    case Constants.DELETE_NOTICE_PERIOD_RESPONSE: {
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
