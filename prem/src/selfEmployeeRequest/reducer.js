import { any } from "prop-types";
import * as Constants from "../constants";
export default (state = {}, { company, type },isSuccess=any,isDeleteSuccess=any) => {
  switch (type) {
    case Constants.REQUESTED_SELF_EMPLOYEE_RESPONSE: {
      console.log("=====in reducer=======");
      const statenew = { ...state };
      statenew.company = company;
      return statenew;
    }
    case Constants.ACCEPT_EMP_RESPONSE: {
      console.log("=====in reducer=======");
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }
    case Constants.DELETE_EMP_RESPONSE: {
      console.log("=====in reducer=======");
      const statenew = { ...state };
      statenew.isDeleteSuccess = isDeleteSuccess;
      return statenew;
    }
    default:
      return state;
  }
};
