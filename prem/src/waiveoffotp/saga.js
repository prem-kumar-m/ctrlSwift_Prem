import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postdata, postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* resendOtp(action) {
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
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.RESEND_WAIVEOFF_CODE_URL,
      {
        invoiceNumber: action.invoiceNumber,
      }
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.resendOtpResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.resendOtpResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message:
        "Unable to get your request, please check your internet connection",
    };
    yield put(Actions.resendOtpResponse(errorMessage));
  }
}

function* requestInvoiceOtp(action) {
  try {
    // const responseData = yield postSecureObject(Base_URL + action.url),
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.VALIDATE_INVOICE_NUMBER_URL,
      {
        invoiceCode: action.invoiceOtp,
        invoiceNumber: action.invoiceNumber,
      }
    );
    console.log("responseData-----------" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyOtpResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifyOtpResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Invalid Credentials. Please check and try again.",
    };
    yield put(Actions.verifyOtpResponse(errorMessage));
  }
}

export default function* invoiceOtpSaga() {
  yield takeLatest(Constants.REQUEST_INVOICE_OTP, requestInvoiceOtp);
  yield takeLatest(Constants.RESEND_WAIVEOFF_CODE, resendOtp);
}
