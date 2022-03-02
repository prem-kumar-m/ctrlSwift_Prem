import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata, postSecureObject } from "../../apil-call";
import { Base_URL } from "../../urls";

function* reqClearAccessTokensCustomer(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.REQ_CLEAR_TOKENS_CUSTOMER_URL,
      {
        email: window.sessionStorage.getItem(Constants.ACCESS_EMAIL),
       // token: window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN),
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.recClearAccessTokensCustomer(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E213"
    ) {
      const errorMessage = {
        success: false,
        message: "Your Session Is Already Logout",
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

export default function* logoutSaga() {
  yield takeLatest(
    Constants.REQ_CLEAR_ACCESS_TOKENS_CUSTOMER,
    reqClearAccessTokensCustomer
  );
}
