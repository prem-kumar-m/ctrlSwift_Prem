import * as Constants from "../constants";

export const requestAllUsers = () => ({
  type: Constants.REQUEST_ALL_USERS,
  url: Constants.API_URLS.LIST_USER_URL,
});

export const allUsersResponse = (users) => ({
  type: Constants.ALL_USERS_RESPONSE,
  users,
});
export const addUser = (employeeId, name, mobile, email, role, mode) => (
  // console.log("mode inside action" + mode),
  {
    type: Constants.ADD_USER, //this will match with your saga
    url:
      mode === "edit"
        ? Constants.API_URLS.UPDATE_USER_URL
        : Constants.API_URLS.ADD_USER_URL,
    employeeId,
    name,
    mobile,
    email,
    role,
  }
);

export const addUserResponse = (isSuccess) => ({
  type: Constants.ADD_USER_RESPONSE,
  isSuccess,
});

export const reqdeleteuser = (employeeId) => ({
  type: Constants.DELETE_USER, //this will match with your saga
  url: Constants.API_URLS.DELETE_USER_URL,
  employeeId,
});

export const deleteUserResponse = (isSuccess) => ({
  type: Constants.DELETE_USER_RESPONSE,
  isSuccess,
});
