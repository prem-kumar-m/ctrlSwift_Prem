import * as Constants from "../constants";
export default (state = {}, { company, type }) => {
  switch (type) {
    case Constants.ACCEPTED_SELF_EMPLOYEE_RESPONSE: {
      console.log("=====in reducer=======");
      const statenew = { ...state };
      statenew.company = company;
      return statenew;
    }
    default:
      return state;
  }
};
