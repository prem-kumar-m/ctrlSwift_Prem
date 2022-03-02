import * as Constants from "../constants";
import * as Actions from "./action";
import { Base_URL } from "../urls";
import { put, takeLatest } from "redux-saga/effects";
import { getSecureData } from "../apil-call";

function* acceptedSelfEmployee(action) {
  try {
    console.log("==========in saga try=========");
    const company = yield getSecureData(Base_URL + action.url);
    console.log("===========in saga res============" + JSON.stringify(company));
    yield put(Actions.acceptedSelfEmployeeResponse(company));
  } catch (e) {
    yield put(Actions.acceptedSelfEmployeeResponse([]));
  }
}

export default function* acceptedSelfEmployeeSaga() {
  yield takeLatest(Constants.ACCEPTED_SELF_EMPLOYEE, acceptedSelfEmployee);
}
