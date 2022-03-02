import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* createOrderDataTer(action) {
  console.log("2st");
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL createOrderData Post method is " + Base_URL + action.url,
      action.data
    );
    const postResponse = yield postSecureObject(Base_URL + action.url, action.data,"Bearer ".concat(
               window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN)));

    console.log("The response data is : \n" + JSON.stringify(postResponse));
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responseCreateOrderDataTer(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responseCreateOrderDataTer(errorMessage));
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseCreateOrderDataTer(errorMessage));
  }
}
function* paymentSuccessTer(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.CREATE_INVOICES_PAYMENT_TERMINATION_URL
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.CREATE_INVOICES_PAYMENT_TERMINATION_URL,
      action.responces,"Bearer ".concat(
               window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );

    console.log("The response data is : \n" + JSON.stringify(postResponse));
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responsePaymentSuccessTer(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responsePaymentSuccessTer(errorMessage));
    }
  } catch (e) {
    const errorMessage = { success: false, message: "Cannot add Feedback." };
    yield put(Actions.responsePaymentSuccessTer(errorMessage));
  }
}

export default function* terminateOrderSaga() {
  yield takeLatest(Constants.CREATE_ORDER_ID_TER, createOrderDataTer);
  yield takeLatest(
    Constants.CREATE_INVOICES_PAYMENT_TERMINATION_REQUEST,
    paymentSuccessTer
  );
}
