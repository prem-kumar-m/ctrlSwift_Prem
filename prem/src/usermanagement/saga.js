import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* requestAllUsers(action) {
  try {
    console.log(
      "fetchdata from DB in saga layer User List -> " + Base_URL + action.url
    );
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    console.log(
      "List of users from server ----------------\n" + dataori.listUsers
    );
    yield put(Actions.allUsersResponse(dataori.listUsers));
  } catch (e) {
    yield put(Actions.allUsersResponse([]));
  }
}

function* addUser(action) {
  try {
    console.log("Inside addUser Saga function " + JSON.stringify(action));
    console.log("The URL to Add User Post method is " + Base_URL + action.url);
    //const responseData = yield postdata(Base_URL + action.url,
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        employeeId: action.employeeId,
        name: action.name,
        mobile: action.mobile,
        email: action.email,
        role: action.role,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    console.log("response data ------->" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.addUserResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addUserResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.addUserResponse(errorMessage));
  }
}

function* deleteuser(action) {
  try {
    console.log("Inside delete user Saga function " + JSON.stringify(action));
    console.log(
      "The URL to Delete User Post method is " + Base_URL + action.url
    );
    //const postResponse = yield postdata(Base_URL + action.url,
    const postResponse = yield postSecureObject(
      Base_URL + action.url,
      {
        employeeId: action.employeeId,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    console.log("The response data is : " + JSON.stringify(postResponse));
    if (postResponse.status === 200) {
      yield put(Actions.deleteUserResponse(postResponse.data));
    } else {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addUserResponse(errorMessage));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.deleteUserResponse(errorMessage));
  }
}

export default function* usersSaga() {
  yield takeLatest(Constants.REQUEST_ALL_USERS, requestAllUsers);
  yield takeLatest(Constants.ADD_USER, addUser);
  yield takeLatest(Constants.DELETE_USER, deleteuser);

  console.log("Requesting from Users List saga");
}
