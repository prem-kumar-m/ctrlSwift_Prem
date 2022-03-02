import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postdata, postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* requestInvoiceNumber(action) {
  console.log("action-----------" + JSON.stringify(action));
  console.log(JSON.stringify("action" + action.invoiceNumber));
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        invoiceNumber: action.invoiceNumber,
      })
  );
  try {
    // const responseData = yield postSecureObject(Base_URL + action.url),
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.INVOICE_NUMBER_URL,
      {
        invoiceNumber: action.invoiceNumber,
      }
    );
    console.log("responseData-----------" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyInvoiceNumber(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const errorMessage = errorMessages(responseData.data.message);
      yield put(Actions.verifyInvoiceNumber(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.verifyInvoiceNumber(errorMessage));
  }
}
export default function* invoiceNumberSaga() {
  yield takeLatest(Constants.REQUEST_INVOICE_NUMBER, requestInvoiceNumber);
}
