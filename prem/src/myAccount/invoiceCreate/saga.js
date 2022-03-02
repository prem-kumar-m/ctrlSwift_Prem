import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata, postSecureObject } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* paymentSuccess(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.CREATE_INVOICES_PAYMENT_URL
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.CREATE_INVOICES_PAYMENT_URL,
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
      yield put(Actions.responsePaymentSuccess(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };

      yield put(Actions.responsePaymentSuccess(errorMessage));
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = { success: false, message: "Cannot add Feedback." };

    yield put(Actions.responsePaymentSuccess(errorMessage));
  }
}

export default function* invoiceCreateSaga() {
  //yield takeLatest(Constants.UPDATE_AGREEMENT, agreementUpdate);
  yield takeLatest(Constants.CREATE_INVOICES_PAYMENT_REQUEST, paymentSuccess);
}
