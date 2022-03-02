import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postdata, getdataObject,postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* loadtimezonelist(action) {
  console.log("action" + JSON.stringify(action));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield getdataObject(Base_URL + action.url);
    console.log("dataori" + dataori);
    yield put(Actions.receiveloadtimezonelist(dataori.data));
  } catch (e) {
    yield put(Actions.receiveloadtimezonelist([]));
  }
}

function* requestloadtimeslot(action) {
  console.log("action" + JSON.stringify(action));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, {
      timeZone: action.timezone.timeZone,
      date: action.timezone.date,
    });
    console.log("dataori" + JSON.stringify(dataori.data));
    yield put(Actions.receiveloadtimeslotlist(dataori.data));
  } catch (e) {
    yield put(Actions.receiveloadtimeslotlist([]));
  }
}

function* requestDemo(action) {
  console.log("action" + JSON.stringify(action));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postSecureObject(Base_URL + action.url, {
      email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
      timeZone: action.demo.country,
      date: action.demo.date,
      startTime: action.demo.startTime,
      endTime: action.demo.endTime,
      inviteesEmail: action.demo.emails,
    },"Bearer ".concat(
             window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN)));
    console.log("dataori" + JSON.stringify(dataori));

    if (
      dataori.status === 200 &&
      dataori.data.success !== "undefined" &&
      dataori.data.success === true
    ) {
      yield put(Actions.responcesDemo(dataori.data));
    } else if (
      dataori.data.success !== "undefined" &&
      dataori.data.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };

      yield put(Actions.responcesDemo(errorMessage));
    }
  } catch (e) {
    yield put(Actions.responcesDemo([]));
  }
}

export default function* requestDemoSaga() {
  yield takeLatest(Constants.REQUEST_LOAD_TIMEZONE_LIST_DATA, loadtimezonelist);
  yield takeLatest(
    Constants.REQUEST_LOAD_TIMESLOT_LIST_DATA,
    requestloadtimeslot
  );
  yield takeLatest(Constants.REQUEST_DEMO, requestDemo);
}
