import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postSecureObject, postdata, getSecureData } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* viewInvoice(action) {
  try {
    console.log(
      "fetchdata from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
    );
    const dataori = yield getSecureData(
      Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID),"Bearer ".concat(
          window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    //const dataori = yield getSecureData(Base_URL + action.url, 'Bearer '.concat(window.sessionStorage.getItem(Constants.ACCESS_TOKEN)));
    console.log("dataori" + JSON.stringify(dataori));
    if (dataori.success === true) {
      yield put(Actions.receiveloadviewInvoiceList(dataori.invoicesList));
    } else if (dataori.success === false) {
      console.log(dataori.message);
      const responcesMessage = errorMessages(dataori.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.receiveloadviewInvoiceList(errorMessage));
    }
  } catch (e) {
    yield put(Actions.receiveloadviewInvoiceList([]));
  }
}

function* downloadinvoice(action) {
  try {
    console.log("fetchdata from DB in saga layer User List -> " + action.url);
    //const dataori = yield getSecureData(action.url);
    const dataori = yield getSecureData(
      action.url,
      window.sessionStorage.getItem(Constants.ACCESS_INVOICETOKEN)
    );

    yield put(Actions.receivedownloadInvoice(dataori));
    console.log("List of users from server ----------------\n" + dataori);
  } catch (e) {
    yield put(Actions.receivedownloadInvoice([]));
  }
}

function* deleteInvoice(action) {
  try {
    console.log("Inside  user Saga function " + JSON.stringify(action));
    console.log(
      "The URL to Delete User Post method is " + Base_URL + action.url
    );
    //const postResponse = yield postdata(Base_URL + action.url,
    const postResponse = yield postSecureObject(
      Base_URL + action.url,
      {
        invoiceNumber: action.invoiceNumber,
      },
      "Bearer ".concat(window.sessionStorage.getItem(Constants.ACCESS_TOKEN))
    );
    console.log("The response data is : " + JSON.stringify(postResponse));
    if (postResponse.status === 200) {
      yield put(Actions.deleteInvoiceResponse(postResponse.data));
    } else {
      yield put(Actions.deleteInvoiceResponse(postResponse.data));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.deleteInvoiceResponse(errorMessage));
  }
}

function* requestInVoices(action) {
  try {
    console.log(
      "Ticket details call from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        action.invoiceId
    );
    const dataori = yield getSecureData(
      Base_URL + action.url + action.invoiceId,"Bearer ".concat(
               window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log(dataori);
    if (dataori !== undefined && dataori !== null) {
      yield put(Actions.resposeInVoice(dataori));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: " Unable to process your request please try again later.",
    };
    yield put(Actions.resposeInVoice(errorMessage));
  }
}

function* paymentSuccess(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.INVOICES_PAYMENT_URL
    );
    // const postResponse = yield postdata(Base_URL + Constants.API_URLS.INVOICES_PAYMENT_URL,{
    //     "generatedSignature":action.responces.razorpay_signature,
    //     "orderId":action.responces.razorpay_order_id,
    //     "razorPaymentId":action.responces.razorpay_payment_id,
    //     //"secret":"pbHMHhoz9Ei7i5pCf9QQOliD",
    // });
    const postResponse = "";
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

export default function* viewInvoicesaga() {
  yield takeLatest(Constants.REQUEST_LOAD_VIEW_INVOICE_LIST, viewInvoice);
  //yield takeLatest(Constants.REQUEST_LOAD_CITY_LIST_DATA, loadcitylist);
  //yield takeLatest(Constants.REQUEST_LOAD_CITY_LIST_DATA,loadcity);
  // yield takeLatest(Constants.REQUEST_LOAD_COMPANY_LIST_DATA,loadcompany);
  //yield takeLatest(Constants.REQUEST_LOAD_UPDATE_USER_LIST_DATA,loaduser);
  yield takeLatest(Constants.DOWNLOAD_INVOICE, downloadinvoice);
  yield takeLatest(Constants.DELETE_INVOICE, deleteInvoice);
  yield takeLatest(Constants.REQUEST_INVOICE_URL, requestInVoices);
  yield takeLatest(Constants.INVOICES_PAYMENT_REQUEST, paymentSuccess);
}
