import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import {
  fetchdataget,
  postdata,
  getdataObject,
  postSecureObject,
  getSecureData,
} from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* loadusers(action) {
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );
    console.log("dataori.listRequests" + JSON.stringify(dataori.listRequests));
    yield put(Actions.recloadrequests(dataori.listRequests));
  } catch (e) {
    yield put(Actions.recloadrequests([]));
  }
}
function* loadshowroomlist(action) {
  try {
    console.log("fetchdata from DB in saga layer");
    const dataori = yield getSecureData(Base_URL + action.url,"Bearer ".concat(
      window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)));
    //console.log("Response is ---------->" + JSON.stringify(dataori));
    yield put(Actions.recloadshowroom(dataori.listShowrooms));
  } catch (e) {
    yield put(Actions.recloadshowroom([]));
  }
}
function* loadsalespersonlist(action) {
  try {
    console.log("loadsalespersonlist from DB in Call center Assgin saga layer");
    // const dataori = yield fetchdataget(Base_URL + action.loadsalesurl);
    const dataori = yield getSecureData(
      Base_URL + action.loadsalesurl,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );
    console.log(
      "loadsalespersonlist Response is ---------->" + JSON.stringify(dataori)
    );
    yield put(Actions.recloadsalespersonlist(dataori.names));
  } catch (e) {
    yield put(Actions.recloadsalespersonlist([]));
  }
}
function* loaditassigneelist(action) {
  try {
    console.log("loaditassigneelist from DB in Assign Request saga layer");
    // const dataori = yield fetchdataget(Base_URL + action.loaditassigneeurl);
    const dataori = yield getSecureData(
      Base_URL + action.loaditassigneeurl,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );
    //console.log("loaditassigneelist Response is ---------->" + JSON.stringify(dataori));
    yield put(Actions.recloaditassigneelist(dataori.names));
  } catch (e) {
    yield put(Actions.recloaditassigneelist([]));
  }
}
function* getsalespersonbyshowroom(action) {
  try {
    console.log(
      "getsalespersonbyshowroom from DB in Call center Assgin saga layer " +
        action.showroom
    );
    const dataori = yield getSecureData(
      Base_URL + action.getbyshowroomurl + action.showroom,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN))
    );
    console.log(
      "getsalespersonbyshowroom Response is ---------->" +
        JSON.stringify(dataori)
    );
    yield put(Actions.recsalesbyshowroom(dataori.names));
  } catch (e) {
    yield put(Actions.recsalesbyshowroom([]));
  }
}
function* getAvailableTimeSlots(action) {
  try {
    console.log(
      "getAvailableTimeSlots from DB in Call center Assgin saga layer " +
        JSON.stringify(action.params)
    );
    const dataori = yield postSecureObject(
      Base_URL + action.url,
      {
        timeZone: action.params.timeZone,
        date: action.params.dateparam,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );
    console.log(
      "getsalespersonbyshowroom Response is ---------->" +
        JSON.stringify(dataori)
    );
    if (dataori.data !== undefined && dataori.data !== null) {
      yield put(Actions.recAvailableSlots(dataori.data));
    } else {
      yield put(Actions.recAvailableSlots([]));
    }
  } catch (e) {
    console.log("caught Exception in getAvailableTimeSlots..");
    yield put(Actions.recAvailableSlots([]));
  }
}

function* saveassignrequest(action) {
  try {
    console.log(
      "saveassignrequest from DB in Call center Assgin saga layer " +
        JSON.stringify(action) +
        "-----------" +
        Constants.MODE_REASSIGN
    );
    let finalurl = Base_URL + Constants.API_URLS.REQ_SAVE_ASSIGN_REQUEST_URL;
    let finalcomments = "";
    console.log(
      "action.params.mode !== undefined------ " +
        action.params.mode +
        "------action.params.mode === Constants.MODE_REASSIGN-----" +
        Constants.MODE_REASSIGN
    );

    if (
      action.params.mode !== undefined &&
      action.params.mode === Constants.MODE_REASSIGN
    ) {
      finalurl = Base_URL + Constants.API_URLS.REQ_SAVE_REASSIGN_REQUEST_URL;
      finalcomments = action.params.comments;
    }
    const postResponse = yield postSecureObject(
      finalurl,
      {
        demoId: action.params.ticket,
        salesperson: action.params.salesperson,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );

    console.log("The response data is : " + JSON.stringify(postResponse));
    if (postResponse.status === 200 && postResponse.data.success === true) {
      yield put(Actions.recsaveassignrequest(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.recsaveassignrequest(errorMessage));
    } else {
      const errorMessage = {
        success: false,
        message: "System Error. Could not Assign this ticket. Plz try later.",
      };
      yield put(Actions.recsaveassignrequest(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not Assign this ticket. Plz try later.",
    };
    yield put(Actions.recsaveassignrequest(errorMessage));
  }
}

function* savereschedulerequest(action) {
  try {
    console.log(
      "savereschedulerequest from DB in Call center Assgin saga layer " +
        JSON.stringify(action)
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.REQ_SAVE_RESCHEDULE_REQUEST_URL,
      {
        demoId: action.params.demoId,
        date: action.params.date,
        timeZone: "(GMT+5:30) Asia/Calcutta",
        startTime: action.params.startTime,
        endTime: action.params.endTime,
        comments: action.params.comments,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );

    console.log(
      "The response data for savereschedulerequest is : " +
        JSON.stringify(postResponse)
    );
    if (postResponse.status === 200) {
      yield put(Actions.recsavereschedulerequest(postResponse.data));
    } else {
      const errorMessage = {
        success: false,
        message:
          "System Error. Could not Reschedule this ticket. Plz try later.",
      };
      yield put(Actions.recsavereschedulerequest(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not AsReschedulesign this ticket. Plz try later.",
    };
    yield put(Actions.recsavereschedulerequest(errorMessage));
  }
}

function* cancellationrequest(action) {
  try {
    console.log(
      "cancellationrequest from DB in Call center Assgin saga layer " +
        JSON.stringify(action)
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.REQ_CANCELLATION_REQUEST_URL,
      {
        demoId: action.params.demoId,
        comments: action.params.comments,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );

    console.log(
      "The response data for cancellationrequest is : " +
        JSON.stringify(postResponse)
    );
    if (postResponse.status === 200) {
      yield put(Actions.reccancellationrequest(postResponse.data));
    } else {
      const errorMessage = {
        success: false,
        message: "System Error. Could not Cancel this ticket. Plz try later.",
      };
      yield put(Actions.reccancellationrequest(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not Cancel this ticket. Plz try later.",
    };
    yield put(Actions.reccancellationrequest(errorMessage));
  }
}
function* completionrequest(action) {
  try {
    console.log(
      "completionrequest from DB in Call center Assgin saga layer " +
        JSON.stringify(action)
    );
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        demoId: action.params.demoId,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );

    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.reccompletionrequest(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.reccompletionrequest(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not Complete this ticket. Plz try later.",
    };
    yield put(Actions.reccompletionrequest(errorMessage));
  }
}

export default function* requestSaga() {
  yield takeLatest(Constants.REQ_LOAD_REQUEST_DATA, loadusers);
  yield takeLatest(Constants.REQ_LOAD_SHOWROOM_DATA, loadshowroomlist);
  yield takeLatest(
    Constants.REQ_LOAD_SALESPERSON_LIST_DATA,
    loadsalespersonlist
  );
  yield takeLatest(Constants.REQ_LOAD_ITASSIGNEE_LIST_DATA, loaditassigneelist);
  yield takeLatest(
    Constants.REQ_LOAD_SALESPERSON_BY_SHOWROOM,
    getsalespersonbyshowroom
  );
  yield takeLatest(Constants.REQ_SAVE_ASSIGN_REQUEST, saveassignrequest);
  yield takeLatest(Constants.REQ_AVAILABLE_SLOTS, getAvailableTimeSlots);
  yield takeLatest(
    Constants.REQ_SAVE_RESCHEDULE_REQUEST,
    savereschedulerequest
  );
  yield takeLatest(Constants.REQ_CANCELLATION_REQUEST, cancellationrequest);
  yield takeLatest(Constants.REQ_COMPLETION_REQUEST, completionrequest);
}
