import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata, getSecureData } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* requestAllDetails(action) {
  try {
    console.log(
      "Ticket details call from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        action.invoiceId
    );
    //const dataori = yield fetchdataget(Base_URL + action.url + action.ticket);
    const dataori = yield getSecureData(
      Base_URL + action.url + action.invoiceId
    );
    console.log(
      "List of users from server ----------------\n" + JSON.stringify(dataori)
    );
    if (dataori !== undefined && dataori !== null) {
      console.log("setting response.....................");
      if (dataori.lineItems !== undefined && dataori.lineItems !== null) {
        console.log(
          "there are lineitems....................." +
            JSON.stringify(dataori.lineItems)
        );
        yield put(
          Actions.allDetailsInvoiceResponse(
            dataori,
            dataori.lineItems,
            dataori.invoicePeriodRequests
          )
        );
      }
      if (
        dataori.invoicePeriodRequests !== undefined &&
        dataori.invoicePeriodRequests !== null
      ) {
        console.log(
          "there are invoiceperiod....................." +
            JSON.stringify(dataori.invoicePeriodRequests.invoicePeriod)
        );
        yield put(
          Actions.allDetailsInvoiceResponse(
            dataori,
            dataori.lineItems,
            dataori.invoicePeriodRequests
          )
        );
      } else {
        console.log(
          "there are NO invitees....................." + JSON.stringify(dataori)
        );
        yield put(
          Actions.allDetailsInvoiceResponse(
            dataori,
            dataori.lineItems,
            dataori.invoicePeriodRequests
          )
        );
      }
    } else {
      yield put(Actions.allDetailsInvoiceResponse([], [], []));
    }
  } catch (e) {
    yield put(Actions.allDetailsInvoiceResponse([], [], []));
  }
}

function* paymentSuccess(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.TAX_INVOICES_PAYMENT_URL
    );
    const postResponse = yield postdata(
      Base_URL + Constants.API_URLS.TAX_INVOICES_PAYMENT_URL,
      {
        generatedSignature: action.responces.razorpay_signature,
        orderId: action.responces.razorpay_order_id,
        razorPaymentId: action.responces.razorpay_payment_id,
        //"secret":"pbHMHhoz9Ei7i5pCf9QQOliD",
      }
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

export default function* taxInvoiceSaga() {
  yield takeLatest(Constants.REQUEST_ALL_DETAILS_INVOICE, requestAllDetails);
  yield takeLatest(Constants.TAX_INVOICES_PAYMENT_REQUEST, paymentSuccess);
}
