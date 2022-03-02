import * as Constants from "../constants";
import * as Actions from "./action";
import { Base_URL } from "../urls";
import { put, takeLatest } from "redux-saga/effects";
import { getSecureData,postSecureObject } from "../apil-call";
import { errorMessages } from "../ErrorMessage";

function* companyNewRequests(action) {
  try {
    console.log("===========in saga============");
    const companyName = yield getSecureData(Base_URL + action.url);
    console.log(
      "===========in saga res============" +
        JSON.stringify(companyName.companyNewRequests)
    );
    yield put(
      Actions.companyNewRequestsResponse(companyName.companyNewRequests)
    );
  } catch (e) {
    yield put(Actions.companyNewRequestsResponse([]));
  }
}

function* reqacceptCompany(action){
 
  try{
    console.log("===========in accept saga=========" + action.companyName);
    const postResponse = yield postSecureObject(
      Base_URL + action.url,
      {
        companyName: action.companyName,
        email:action.email,
        status:action.status,
      },
    );
    console.log("The response data is : " + JSON.stringify(postResponse));
    if (postResponse.status === 200) {
      yield put(Actions.reqacceptCompanyResponse(postResponse.data));
    } else {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.reqacceptCompanyResponse(errorMessage));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.reqacceptCompanyResponse(errorMessage));
  }
}
function* reqdeleteCompany(action){
 
  try{
    console.log("===========in accept saga=========" + action.companyName);
    const postResponse = yield postSecureObject(
      Base_URL + action.url,
      {
        companyName: action.companyName,
        email:action.email,
        status:action.status,
      },
    );
    console.log("The response data is : " + JSON.stringify(postResponse));
    if (postResponse.status === 200) {
      yield put(Actions.reqdeleteCompanyResponse(postResponse.data));
    } else {
      const responcesMessage = errorMessage(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.reqdeleteCompanyResponse(errorMessage));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.reqdeleteCompanyResponse(errorMessage));
  }
}
export default function* companyNewRequestsSaga() {
  yield takeLatest(Constants.REQUESTED_PARTNERS, companyNewRequests);
  yield takeLatest(Constants.ACCEPT_COMPANY, reqacceptCompany);
  yield takeLatest(Constants.DELETE_COMPANY, reqdeleteCompany);

}
