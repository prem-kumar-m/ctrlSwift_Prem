import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata, postSecureObject } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* verifyCredentialCustomer(action) {
  console.log("action-----------" + JSON.stringify(action));
  console.log(JSON.stringify("action" + action.pincode));
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        email: action.email,
        password: action.password,
      })
  );
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.CUSTOMER_LOGIN_VERIFY_URL,
      {
        email: action.email,
        password: action.password,
      }
    );
    console.log("responseData-----------" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyCredentialCustomerResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const errorMessage = errorMessages(responseData.data.message);
      yield put(Actions.verifyCredentialCustomerResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Invalid Credentials. Please check and try again.",
    };
    yield put(Actions.verifyCredentialCustomerResponse(errorMessage));
  }
}

function* reqClearAccessTokensCustomer(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.REQ_CLEAR_TOKENS_CUSTOMER_URL,
      {
        email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.recClearAccessTokensCustomer(responseData.data));
    } else {
      const errorMessage = {
        success: false,
        message: "Clearing Access Tokens is unsuccessful.",
      };
      yield put(Actions.recClearAccessTokensCustomer(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.recClearAccessTokensCustomer(errorMessage));
  }
}

export default function* loginSaga() {
  yield takeLatest(
    Constants.REQ_CLEAR_ACCESS_TOKENS_CUSTOMER,
    reqClearAccessTokensCustomer
  );
  yield takeLatest(
    Constants.VERIFY_CUSTOMER_LOGIN_CREDENTIAL,
    verifyCredentialCustomer
  );
}
