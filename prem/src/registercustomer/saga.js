import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { errorMessages } from "../ErrorMessage";
import {
  fetchdataget,
  postdata,
  getdataObject,
  postSecureObject,
  getSecureData,
} from "../apil-call";
import { Base_URL } from "../urls";

function* loadcustomer(action) {
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    // console.log(
    //   "dataorilistRegistered customer" +
    //     JSON.stringify(dataori.userRegisteredRequestList)
    // );
    yield put(Actions.recloadreguser(dataori.userRegisteredRequestList));
  } catch (e) {
    yield put(Actions.recloadreguser([]));
  }
}

// -------------------DASBOARD -------------------//

function* requestloadallData(action) {
  try {
    console.log(
      "Get all DATA URL -->" +  Base_URL + Constants.API_URLS.LOAD_ADMIN_PLAN_DETAILS,
      window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
    );
    const dataori = yield getSecureData(
      Base_URL +Constants.API_URLS.LOAD_ADMIN_PLAN_DETAILS+"/"+action.year);
    // console.log("response for loadData is ->" + JSON.stringify(dataori));
    if (
      dataori.success !== "undefined" &&
      dataori.success === true
    ) {
    yield put(Actions.reciveloadallData(dataori));
    } else if (
      dataori.success !== "undefined" &&
      dataori.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.reciveloadallData(errorMessage));
    }
  } catch (e) {
    yield put(Actions.reciveloadallData([]));
  }
}

function* planDetailsList(action) {
  try {
    console.log(
      "planDetialslist saga layer " +
        action.id +
        "\n" +
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
    );
    const responseData = yield getSecureData(
      Base_URL + action.url + "/" + action.id,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );

    console.log("responseData" + JSON.stringify(responseData));
    if (responseData.success !== "undefined" && responseData.success === true) {
      yield put(Actions.planDetialsResponces(responseData));
    } else if (
      responseData.success !== "undefined" &&
      responseData.success === false
    ) {
      console.log("testing");
      const responcesMessage = errorMessages(responseData.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.planDetialsResponces(errorMessage));
    }
  } catch (e) {
    console.log("testing" + e);
    const errorresponse = {
      success: false,
      message: "Could not Complete this ticket. Plz try later.",
    };
    yield put(Actions.planDetialsResponces(errorresponse));
  }
}


export default function* reguserSaga() {
  yield takeLatest(Constants.REQ_LOAD_REG_USER_DATA, loadcustomer);
  yield takeLatest(Constants.REQUEST_LOAD_ADMIN_PLAN_DETAILS, requestloadallData);
  yield takeLatest(Constants.PLAN_DETAILS_REQUEST, planDetailsList);

}
