import * as Constants from "../constants";
import * as Actions from "./action";
import { Base_URL } from "../urls";
import { put, takeLatest } from "redux-saga/effects";
import { getSecureData, postSecureObject } from "../apil-call";
import { errorMessages } from "../ErrorMessage";


function* requestedSelfEmployee(action) {
  try {
    console.log("==========in saga try=========");
    const company = yield getSecureData(Base_URL + action.url);
    console.log("===========in saga res============" + JSON.stringify(company));
    yield put(Actions.requestedSelfEmployeeResponse(company));
  } catch (e) {
    yield put(Actions.requestedSelfEmployeeResponse([]));
  }
}

function* reqacceptEmp(action){
 
  try{
    
    const postResponse = yield postSecureObject(
      Base_URL + action.url,
      {
        
        email:action.email,
        status:action.status,
      },
    );
    console.log("The response data is : " + JSON.stringify(postResponse));
    if (postResponse.status === 200) {
      yield put(Actions.reqacceptEmpResponse(postResponse.data));
    } else {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.reqacceptEmpResponse(errorMessage));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.reqacceptEmpResponse(errorMessage));
  }
}
function* reqdeleteEmp(action){
 
  try{
    console.log("===========in accept saga=========");
    const postResponse = yield postSecureObject(
      Base_URL + action.url,
      {
        
        email:action.email,
        status:action.status,
      },
    );
    console.log("The response data is : " + JSON.stringify(postResponse));
    if (postResponse.status === 200) {
      yield put(Actions.reqdeleteEmpResponse(postResponse.data));
    } else {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.reqdeleteEmpResponse(errorMessage));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.reqdeleteEmpResponse(errorMessage));
  }
}

export default function* requestedSelfEmployeeSaga() {
  yield takeLatest(Constants.REQUESTED_SELF_EMPLOYEE, requestedSelfEmployee);
  yield takeLatest(Constants.ACCEPT_EMP, reqacceptEmp);
  yield takeLatest(Constants.DELETE_EMP, reqdeleteEmp);

}
