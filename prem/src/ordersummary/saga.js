import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postdata,postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* getPriceDetails(action) {
  try {
    console.log(
      "The is " +
        Base_URL +
        Constants.API_URLS.GET_PRICE_DETAILS_URL
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.PRICE_DETAILS_URL,
      action.data,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );

    console.log("The response data is : \n" + JSON.stringify(postResponse));
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responseGetPriceDetails(postResponse.data));
    }
    else if (
      postResponse.data.success !== "undefined" &&
      postResponse.data.success === false &&
      postResponse.data.message === "E304"
    ) {
      const errorMessage = {
        success: false,
        message: "Your Email Id has an existing account,Please login",
      };
      yield put(Actions.responseGetPriceDetails(errorMessage));
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseGetPriceDetails(errorMessage));
  }
}

function* requestInr(action) {
  try {
    console.log(JSON.stringify(action.data));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.GET_PRICE_DETAILS_URL
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.CURRENCY_INR_URL,
      action.data,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );

    console.log("The response data is : \n" + JSON.stringify(postResponse));
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responseRequestInr(postResponse.data));
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseRequestInr(errorMessage));
  }
}

function* getPriceByTerms(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.GET_PRICE_DETAILS_URL
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.GET_PRICE_BY_TERMS_URL,
      action.data,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );

    console.log("The response data is : \n" + JSON.stringify(postResponse));
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responseGetPriceByTerms(postResponse.data));
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseGetPriceByTerms(errorMessage));
  }
}

function* insertPlan(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.GET_PRICE_DETAILS_URL
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.INSERT_PLAN_URL,
      action.data,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log("The response data is : \n" + JSON.stringify(postResponse));
    console.log("The response data is : \n" + postResponse.config.data);
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responseInsertPlan(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      if (postResponse.data.message === "E251") {
        const errorMessage = {
          success: false,
          message:
            "Request to keep the currency type as previous plan taken('currency type':" +
            postResponse.data.currencyCode +
            ")",
        };
        yield put(Actions.responseInsertPlan(errorMessage));
      } else {
        const responcesMessage = errorMessages(postResponse.data.message);
        const errorMessage = { success: false, message: responcesMessage };
        yield put(Actions.responseInsertPlan(errorMessage));
      }
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseInsertPlan(errorMessage));
  }
}
function* upgradePlan(action) {
  try {
    console.log("saga" + JSON.stringify(action.data));
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.UPGRADE_PLAN_URL,
      action.data,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.upgradePlanResponse(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.upgradePlanResponse(errorMessage));
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.upgradePlanResponse(errorMessage));
  }
}

function* insertData(action) {
  try {
    console.log("saga" + JSON.stringify(action.data));
    const postResponse = yield postdata(
      Base_URL + Constants.API_URLS.INSERT_DATA_URL,
      action.data
    );
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.insertDataResponse(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.insertDataResponse(errorMessage));
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.insertDataResponse(errorMessage));
  }
}

export default function* orderChangeSaga() {
  yield takeLatest(Constants.GET_PRICE_DETAILS, getPriceDetails);
  yield takeLatest(Constants.GET_PRICE_BY_TERMS, getPriceByTerms);
  yield takeLatest(Constants.REQUEST_INR, requestInr);
  yield takeLatest(Constants.INSERT_PLAN, insertPlan);
  yield takeLatest(Constants.UPGRADE_PLAN, upgradePlan);
  yield takeLatest(Constants.INSERT_DATA, insertData);
}
