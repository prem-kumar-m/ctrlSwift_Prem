import * as Constants from "../constants";

export const submitselfemp = (data) => (
  console.log("country Priya" + JSON.stringify(data)),
  {
    type: Constants.SUBMIT_SELFEMP, //this will match with your saga
    url: Constants.API_URLS.SUBMIT_SELFEMP_URL,
    data,
  }
);

export const submitselfempresponse = (isSelfSuccess) => (
  console.log("================in action response================="),
  {
    type: Constants.SUBMIT_SELFEMP_RESPONSE,
    isSelfSuccess,
  }
);
export const verifyAadharNumber = (aadharNumber) => (
  console.log("country Priya" + JSON.stringify(aadharNumber)),
  {
    type: Constants.  VERIFY_AADHAR, //this will match with your saga
    url: Constants.API_URLS.  VERIFY_AADHAR_URL,
    aadharNumber,
  }
);

export const verifyAadharNumberResponse = (isAadharSuccess) => (
  console.log("================in action response=================" + JSON.stringify(isAadharSuccess)),
  {
    type: Constants.  VERIFY_AADHAR_RESPONSE,
    isAadharSuccess,
  }
);