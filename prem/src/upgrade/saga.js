import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postdata,postSecureObject, getdataObject, getSecureData } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* loadtimezonelist(action) {
  console.log("action" + JSON.stringify(action));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield getdataObject(Base_URL + action.url);
    // console.log("dataori"+dataori)
    yield put(Actions.receiveloadtimezonelist(dataori.data));
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };
    yield put(Actions.receiveloadtimezonelist(errorMessage));
  }
}

function* requestLiteClaculatePrice(action) {
  console.log("action" + JSON.stringify(action.data));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, action.data);
    console.log("dataori" + JSON.stringify(dataori));
    if (dataori.data.success !== "undefined" && dataori.data.success === true) {
      yield put(Actions.responcesLiteClaculatePrice(dataori.data));
    } else if (
      dataori.data.success !== "undefined" &&
      dataori.data.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responcesLiteClaculatePrice(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responcesLiteClaculatePrice(errorMessage));
  }
}

function* requestEnterpriseClaculatePriceupgread(action) {
  console.log("action Upgread-Downgread" + JSON.stringify(action.data));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, action.data);
    console.log("dataori\n" + JSON.stringify(dataori.data));
    if (dataori.data.success !== "undefined" && dataori.data.success === true) {
      yield put(Actions.responcesEnterpriseClaculatePriceupgread(dataori.data));
    } else if (
      dataori.data.success !== "undefined" &&
      dataori.data.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responcesEnterpriseClaculatePriceupgread(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responcesEnterpriseClaculatePriceupgread(errorMessage));
  }
}

function* requestPremiumClaculatePrice(action) {
  console.log("action" + JSON.stringify(action.data));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, action.data);
    console.log("dataori\n" + JSON.stringify(dataori.data));
    if (dataori.data.success !== "undefined" && dataori.data.success === true) {
      yield put(Actions.responcesPremiumClaculatePrice(dataori.data));
    } else if (
      dataori.data.success !== "undefined" &&
      dataori.data.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responcesPremiumClaculatePrice(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responcesPremiumClaculatePrice(errorMessage));
  }
}
function* loaddetails(action) {
  try {
    // console.log('Get all company URL -->' + Base_URL + action.url + action.email);
    const dataori = yield getSecureData(
      Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL),"Bearer ".concat(
          window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log("response for email is ->" + JSON.stringify(dataori));
    //yield put(Actions.receiveloadcompany(dataori.userList));
    yield put(Actions.receiveloaddetails(dataori));
  } catch (e) {
    yield put(Actions.receiveloaddetails([]));
  }
}

function* litetimeslot(action) {
  console.log("action" + JSON.stringify(action));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, {
      timeZone: action.liteTimeZone,
    });
    //console.log("dataori"+JSON.stringify(dataori))
    yield put(Actions.responceslitetime(dataori.data));
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responceslitetime(errorMessage));
  }
}

function* automatedEndTime(action) {
  console.log("action" + JSON.stringify(action));
  //console.log(JSON.stringify('action'+action.pincode));
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        timeZone: action.liteTimeZone,
        serviceSupport: action.liteserviceSupport,
        startTime: action.liteStartTime,
      })
  );
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, {
      timeZone: action.liteTimeZone,
      serviceSupport: action.liteserviceSupport,
      startTime: action.liteStartTime,
    });
    console.log("dataori" + JSON.stringify(dataori));
    yield put(Actions.responcesautomatedtime(dataori.data));
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responcesautomatedtime(errorMessage));
  }
}

function* automatedEndTimeEnterprise(action) {
  console.log("action" + JSON.stringify(action));
  //console.log(JSON.stringify('action'+action.pincode));
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        timeZone: action.enterpriseTimeZone,
        serviceSupport: action.enterpriseserviceSupport,
        startTime: action.enterpriseStartTime,
      })
  );
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, {
      timeZone: action.enterpriseTimeZone,
      serviceSupport: action.enterpriseserviceSupport,
      startTime: action.enterpriseStartTime,
    });
    console.log("dataori" + JSON.stringify(dataori));
    yield put(Actions.responcesautomatedtimeenterprise(dataori.data));
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responcesautomatedtimeenterprise(errorMessage));
  }
}

function* automatedEndTimePremium(action) {
  console.log("action" + JSON.stringify(action));
  //console.log(JSON.stringify('action'+action.pincode));
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        timeZone: action.premiumTimezone,
        serviceSupport: action.premiumserviceSupport,
        startTime: action.premiumStartTime,
      })
  );
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, {
      timeZone: action.premiumTimezone,
      serviceSupport: action.premiumserviceSupport,
      startTime: action.premiumStartTime,
    });
    console.log("dataori" + JSON.stringify(dataori));
    yield put(Actions.responcesautomatedtimepremium(dataori.data));
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responcesautomatedtimepremium(errorMessage));
  }
}

function* requestClaculatePrice(action) {
  console.log("action" + JSON.stringify(action.data));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield postdata(Base_URL + action.url, action.data);
    console.log("------checking-------" + Base_URL + action.url, action.data);
    console.log("---------dataori---------" + JSON.stringify(dataori.data));
    if (dataori.data.success !== "undefined" && dataori.data.success === true) {
      yield put(Actions.responcesClaculatePrice(dataori.data));
    } else if (
      dataori.data.success !== "undefined" &&
      dataori.data.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responcesClaculatePrice(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responcesClaculatePrice(errorMessage));
  }
}

function* requestcheckstatus(action) {
  console.log("action" + JSON.stringify(action.data));
  try {
    const dataori = yield postSecureObject(Base_URL + action.url, action.data,"Bearer ".concat(
      window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN)));
    console.log("------checking-------" + Base_URL + action.url, action.data);
    console.log("---------dataori---------" + JSON.stringify(dataori.data));
    if (dataori.data.success !== "undefined" && dataori.data.success === true) {
      yield put(Actions.responcesCheckStatus(dataori.data));
    } else if (
      dataori.data.success !== "undefined" &&
      dataori.data.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responcesCheckStatus(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responcesCheckStatus(errorMessage));
  }
}

export default function* upgradeSaga() {
  yield takeLatest(
    Constants.UPGRADE_REQUEST_LOAD_TIMEZONE_LIST_DATA,
    loadtimezonelist
  );
  yield takeLatest(
    Constants.REQUEST_LITE_CALCULATE_PRICE,
    requestLiteClaculatePrice
  );
  yield takeLatest(
    Constants.REQUEST_FINAL_CALCULATE_PRICE,
    requestClaculatePrice
  );
  yield takeLatest(Constants.REQUEST_CHECKSTATUS, requestcheckstatus);
  yield takeLatest(
    Constants.REQUEST_ENTERPRISE_CALCULATE_PRICE,
    requestEnterpriseClaculatePriceupgread
  );
  yield takeLatest(
    Constants.REQUEST_PREMIUM_CALCULATE_PRICE,
    requestPremiumClaculatePrice
  );
  yield takeLatest(Constants.REQUEST_LITE_TIME, litetimeslot);
  yield takeLatest(Constants.REQUEST_AUTOMATED_TIME, automatedEndTime);
  yield takeLatest(
    Constants.REQUEST_AUTOMATED_TIME_ENTERPRISE,
    automatedEndTimeEnterprise
  );
  yield takeLatest(
    Constants.REQUEST_AUTOMATED_TIME_PREMIUM,
    automatedEndTimePremium
  );
  yield takeLatest(Constants.REQUEST_LOAD_DETAILS_LIST_DATA, loaddetails);
}
