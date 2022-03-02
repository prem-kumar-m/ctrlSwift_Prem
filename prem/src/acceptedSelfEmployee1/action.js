import * as Constants from "../constants";
export const acceptedSelfEmployee = () => (
  // console.log("====in Action======"),
  {
    type: Constants.ACCEPTED_SELF_EMPLOYEE,
    url: Constants.API_URLS.ACCEPTED_SELF_EMPLOYEE_URL,
  }
);

export const acceptedSelfEmployeeResponse = (company) => (
  // console.log("==========in action response"),
  {
    type: Constants.ACCEPTED_SELF_EMPLOYEE_RESPONSE,
    company,
  }
);
