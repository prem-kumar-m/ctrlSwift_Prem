import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postSecureObject, getSecureData } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

/*function* agreementUpdate(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.GET_PRICE_DETAILS_URL
    );
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.DMAS_AGREEMENT_URL,
      action.data,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );

    console.log(
      "The response data is : \n" + JSON.stringify(postResponse.data)
    );
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responseAgreementUpdate(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responseAgreementUpdate(errorMessage));
    }
  } catch (e) {
    console.log("There is an exception in getting response data for Feedback ");
    const errorMessage = { success: false, message: "Cannot add Feedback." };
    yield put(Actions.responseAgreementUpdate(errorMessage));
  }
}*/
function* requestAllDetails(action) {
  try {
    console.log(
      "Ticket details call from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        action.invoiceNumber
    );
    //const dataori = yield fetchdataget(Base_URL + action.url + action.ticket);
    const dataori = yield getSecureData(
      Base_URL + action.url + action.invoiceNumber
    );
    console.log(
      "List of users from server ----------------\n" + JSON.stringify(dataori)
    );
    if (dataori !== undefined && dataori !== null) {
      console.log("setting response.....................");
      if (dataori.lineItems !== undefined && dataori.lineItems !== null) {
        console.log(
          "there are invitees....................." +
            JSON.stringify(dataori.lineItems)
        );
        yield put(
          Actions.allDetailsInvoiceResponse(dataori, dataori.lineItems)
        );
      } else {
        console.log(
          "there are NO invitees....................." + JSON.stringify(dataori)
        );
        yield put(Actions.allDetailsInvoiceResponse(dataori, []));
      }
    } else {
      yield put(Actions.allDetailsInvoiceResponse([], []));
    }
  } catch (e) {
    yield put(Actions.allDetailsInvoiceResponse([], []));
  }
}

export default function* taxInvoiceSaga() {
// yield takeLatest(Constants.UPDATE_AGREEMENT, agreementUpdate);
  yield takeLatest(Constants.REQUEST_ALL_DETAILS_INVOICE, requestAllDetails);
}
