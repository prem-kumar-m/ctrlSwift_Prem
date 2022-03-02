import * as Constants from "../constants";
import { any } from "prop-types";
export default (state = {}, { company, type },isSuccess=any,isDeleteSuccess=any) => {
  switch (type) {
    case Constants.REQUESTED_PARTNERS_RESPONSE: {
      console.log("========in reducer=======");
      const statenew = { ...state };
      statenew.company = company;
      return statenew;
    }
    case Constants.ACCEPT_COMPANY_RESPONSE: {
      console.log("accept company Success in reducer....... " + isSuccess);
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }
    case Constants.DELETE_COMPANY_RESPONSE: {
      console.log("accept company Success in reducer....... " + isSuccess);
      const statenew = { ...state };
      statenew.isDeleteSuccess = isDeleteSuccess;
      return statenew;
    }
    default:
      return state;
  }
};
