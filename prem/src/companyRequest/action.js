import * as Constants from "../constants";

export const companyNewRequests = () => (
  console.log("=======in action ==========="),
  {
    type: Constants.REQUESTED_PARTNERS,
    url: Constants.API_URLS.REQUESTED_PARTNERS_URL,
  }
);

export const companyNewRequestsResponse = (company) => (
  console.log("=========in action response============"),
  {
    type: Constants.REQUESTED_PARTNERS_RESPONSE,
    company,
  }
);

export const reqacceptCompany = (companyName,email,status) =>(
  console.log("============in action accept company==========="+status),
  {
    type:Constants.ACCEPT_COMPANY,
    url: Constants.API_URLS.ACCEPT_COMPANY_URL,
    companyName,email,status,
  }
);

export const reqacceptCompanyResponse = (isSuccess) =>({
  
  type: Constants.ACCEPT_COMPANY_RESPONSE,
  isSuccess,

}
);

export const reqdeleteCompany = (companyName,email,status) =>(
  console.log("============in action delete company==========="+status),
  {
    type:Constants.DELETE_COMPANY,
    url: Constants.API_URLS.ACCEPT_COMPANY_URL,
    companyName,email,status,
  }
);

export const reqdeleteCompanyResponse = (isDeleteSuccess) =>({
  
  type: Constants.DELETE_COMPANY_RESPONSE,
  isDeleteSuccess,

}
);

