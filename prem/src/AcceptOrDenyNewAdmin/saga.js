import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject,postdata, getdataObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";
import { act } from "react-dom/test-utils";

function* requestAllClients(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL +Constants.API_URLS.REQUEST_ALL_CLIENTS_URL+"?token="+action.ticket1
    );
    console.log("In Saga" + Base_URL +Constants.API_URLS.REQUEST_ALL_CLIENTS_URL+action.ticket1);
    yield put(Actions.allClientsResponse(dataori));
  } catch (e) {
    yield put(Actions.allClientsResponse([]));
  }
}

function* addClient(action) {
    console.log("saga----: " +JSON.stringify(action.ticket1));

  try {
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        token: action.ticket1,
      },
     
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.addClientResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log(responseData.data.message);
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addClientResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.addClientResponse(errorMessage));
  }
}


// function* addClient(action) {
//   console.log("saga----: " +JSON.stringify(action.ticket1));
//   try {
//     const responseData = yield postSecureObject(
//       Base_URL + action.url,
//       {
//         token: action.ticket1,
//       },
//       console.log(
//         {        token:action.ticket1
//         }
//       )
//     );
//     console.log("The response data is : " + JSON.stringify(responseData));
//     console.log(responseData.data.message);
//     if (
//       responseData.data.success !== "undefined" &&
//       responseData.data.success === true
//     ) {
//       yield put(Actions.addClientResponse(responseData.data));
//     } else if (
//       responseData.data.success !== "undefined" &&
//       responseData.data.success === false
//     ) {
//       console.log(responseData.data.message);
//       const responcesMessage = errorMessages(responseData.data.message);
//       const errorMessage = { success: false, message: responcesMessage };
//       yield put(Actions.addClientResponse(errorMessage));
//     }
//   } catch (e) {
//     const errorMessage = {
//       success: false,
//       message: "Unable to Add User, please check your internet connection",
//     };
//     yield put(Actions.addClientResponse(errorMessage));
//   }
// }  

function* reqdeleteClient(action) {
  console.log(JSON.stringify(action));
  try {
    const postResponse = yield postSecureObject(
      Base_URL + action.url,
      {
        token:action.ticket1,
      },
     
    );
    console.log("The response data is : " + JSON.stringify(postResponse));
    console.log(postResponse.data.message);
    if (
      postResponse.status === 200 &&
      postResponse.data.success !== "undefined" &&
      postResponse.data.success === true
    ) {
      yield put(Actions.deleteClientResponse(postResponse.data));
    } else if (
      postResponse.data.success !== "undefined" &&
      postResponse.data.success === false
    ) {
      console.log(postResponse.data.message);
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.deleteClientResponse(errorMessage));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.deleteClientResponse(errorMessage));
  }
}

export default function* AcceptOrDenyNewAdminSaga() {
  yield takeLatest(Constants.REQUEST_ALL_CLIENTS, requestAllClients);
  yield takeLatest(Constants.ADD_CLIENT, addClient);
  yield takeLatest(Constants.DELETE_CLIENT, reqdeleteClient);

  console.log("Requesting from Users List saga");
}
