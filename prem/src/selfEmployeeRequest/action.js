import * as Constants from "../constants";
export const requestedSelfEmployee = () => (
  console.log("====in Action======"),
  {
    type: Constants.REQUESTED_SELF_EMPLOYEE,
    url: Constants.API_URLS.REQUESTED_SELF_EMPLOYEE_URL,
  }
);

export const requestedSelfEmployeeResponse = (company) => (
  console.log("==========in action response"),
  {
    type: Constants.REQUESTED_SELF_EMPLOYEE_RESPONSE,
    company,
  }
);
export const reqacceptEmp = (email,status) =>(
  console.log("============in action accept Emp==========="+status),
  {
    type:Constants.ACCEPT_EMP,
    url: Constants.API_URLS.ACCEPT_EMP_URL,
    email,status,
  }
);

export const reqacceptEmpResponse = (isSuccess) =>({
  
  type: Constants.ACCEPT_EMP_RESPONSE,
  isSuccess,

}
);

export const reqdeleteEmp = (email,status) =>(
  console.log("============in action delete Emp==========="+status),
  {
    type:Constants.DELETE_EMP,
    url: Constants.API_URLS.ACCEPT_EMP_URL,
    email,status,
  }
);

export const reqdeleteEmpResponse = (isDeleteSuccess) =>({
  
  type: Constants.DELETE_EMP_RESPONSE,
  isDeleteSuccess,

}
);

