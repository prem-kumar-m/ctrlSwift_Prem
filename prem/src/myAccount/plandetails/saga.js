import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postSecureObject, fetchdataget, getSecureData } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* changePlan(action) {
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        currentPlan: action.currentPlan,
        initiationDate: action.initiationDate,
        expiresOn: action.expiresOn,
        status: action.status,
      })
  );
  try {
    console.log(
      "fetchdata from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    const dataori = yield getSecureData(
      Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL),"Bearer ".concat(
          window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    //const dataori = yield getSecureData(Base_URL + action.url, 'Bearer '.concat(window.sessionStorage.getItem(Constants.ACCESS_TOKEN)));
    console.log(JSON.stringify(dataori));
    if (dataori.success === true) {
      yield put(Actions.receiveloadchangePlanList(dataori.listPlanRequests));
    } else if (dataori.success === false) {
      console.log(dataori.message);
      const responcesMessage = errorMessages(dataori.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.receiveloadchangePlanList(errorMessage));
    }
  } catch (e) {
    yield put(Actions.receiveloadchangePlanList([]));
  }
}

function* planDetalis(action) {
  ////console.log("testing"+Base_URL+ action.url+action.data.token+"/"+action.data.plan);
  try {
    // ////console.log("fetchdata from DB in saga layer User List -> " +Base_URL + action.url+ window.sessionStorage.getItem(Constants.ACCESS_EMAIL));
    const dataori = yield getSecureData(
      Base_URL + action.url + action.data.token + "/" + action.data.plan,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    //const dataori = yield getSecureData(Base_URL + action.url,'Bearer '.concat(window.sessionStorage.getItem(Constants.ACCESS_TOKEN)));
    console.log(JSON.stringify(dataori));
    if (dataori.success === true) {
      yield put(Actions.receiveplanDetial(dataori));
    } else if (dataori.success === false) {
      console.log(dataori.message);
      const responcesMessage = errorMessages(dataori.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.receiveplanDetial(errorMessage));
    }
  } catch (e) {
    yield put(Actions.receiveplanDetial([]));
  }
}

//====

function* choosePlans(action) {
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        email: action.email,
        planList: action.planList,
        contractDuration: action.contractDuration,
      })
  );
  try {
    console.log(
      "fetchdata from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL),"Bearer ".concat(
          window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    const dataori = yield getSecureData(
      Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL),"Bearer ".concat(
          window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    //const dataori = yield getSecureData(Base_URL + action.url, 'Bearer '.concat(window.sessionStorage.getItem(Constants.ACCESS_TOKEN)));
    console.log(JSON.stringify(dataori.planRequests));
    yield put(Actions.receiveloadchoosePlansList(dataori));
  } catch (e) {
    yield put(Actions.receiveloadchoosePlansList([]));
  }
}

function* choosePlansEx(action) {
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        email: action.email,
        planList: action.planList,
        contractDuration: action.contractDuration,
      })
  );
  try {
    console.log(
      "fetchdata from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL),"Bearer ".concat(
          window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    const dataori = yield getSecureData(
      Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL),"Bearer ".concat(
          window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log(JSON.stringify(dataori.planRequests));
    //const dataori = yield getSecureData(Base_URL + action.url, 'Bearer '.concat(window.sessionStorage.getItem(Constants.ACCESS_TOKEN)));
    yield put(Actions.receiveloadchoosePlansListExtend(dataori));
  } catch (e) {
    yield put(Actions.receiveloadchoosePlansListExtend([]));
  }
}

function* contractUpdate(action) {
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        email: action.email,
        planList: action.planList,
        contractDuration: action.contractDuration,
        // 'paymentTerms': action.paymentTerms,
      })
  );
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.LIST_CONTRACT_UPDATE_URL,
      {
        email: action.email,
        planList: action.planList,
        contractDuration: action.contractDuration,
        // 'paymentTerms': action.paymentTerms,
      },"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log("response data ------->" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.contractUpdateResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.contractUpdateResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Update, please check your internet connection",
    };
    yield put(Actions.contractUpdateResponse(errorMessage));
  }
}

function* contractTerminate(action) {
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        email: action.email,
        planList: action.planList,
        reason: action.reason,
      })
  );
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.LIST_CONTRACT_TERMINATE_URL,
      {
        email: action.email,
        planList: action.planList,
        reason: action.reason,
      },"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log("response data ------->" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.contractTerminateResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.contractTerminateResponse(errorMessage));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E101"
    ) {
      const errorMessage = {
        success: false,
        message:
          "Entered email is seems to be already registered. Please register",
      };
      yield put(Actions.contractTerminateResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Update, please check your internet connection",
    };
    yield put(Actions.contractTerminateResponse(errorMessage));
  }
}

function* requestCheckNoticePeriod(action) {
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        planList: action.planDetials,
      })
  );
  try {
    console.log(
      "fetchdata from DB in saga layer User List -> " + Base_URL + action.url
    );
    const dataori = yield postSecureObject(Base_URL + action.url, {
      planList: action.planDetials,
    },"Bearer ".concat(
      window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN)));
    //const dataori = yield getSecureData(Base_URL + action.url, 'Bearer '.concat(window.sessionStorage.getItem(Constants.ACCESS_TOKEN)));
    console.log("testing" + JSON.stringify(dataori));
    if (dataori.data.success !== "undefined" && dataori.data.success === true) {
      yield put(Actions.receiveCheckNoticePeriod(dataori.data));
    } else if (
      dataori.data.success !== "undefined" &&
      dataori.data.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.receiveCheckNoticePeriod(errorMessage));
    }
  } catch (e) {
    yield put(Actions.receiveCheckNoticePeriod([]));
  }
}

export default function* changePlansaga() {
  yield takeLatest(Constants.REQUEST_LOAD_CUSTOMERID_LIST, changePlan);
  yield takeLatest(Constants.REQUEST_PLAN_DETAILS, planDetalis);
  yield takeLatest(Constants.REQUEST_LOAD_CHOOSEPLANS_LIST, choosePlans);
  yield takeLatest(Constants.CONTRACT_UPDATE, contractUpdate);
  yield takeLatest(Constants.CONTRACT_TERMINATE, contractTerminate);
  yield takeLatest(
    Constants.REQUEST_LOAD_CHOOSEPLANS_LIST_EXTEND,
    choosePlansEx
  );
  yield takeLatest(
    Constants.REQUEST_CHECK_NOTICE_PERIOD,
    requestCheckNoticePeriod
  );
}
