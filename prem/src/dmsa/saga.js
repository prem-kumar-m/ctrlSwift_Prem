import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postdata, postdatafileDmsa ,postSecureObject} from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* agreementUpdate(action) {
  try {
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.DMAS_AGREEMENT_URL,
      action.data,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
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
      if (postResponse.data.message == "E251") {
        const errorMessage = {
          success: false,
          message:
            "Request to keep the currency type as previous plan taken('currency type':" +
            postResponse.data.currencyCode +
            ")",
        };
        yield put(Actions.responseAgreementUpdate(errorMessage));
      } else {
        const responcesMessage = errorMessages(postResponse.data.message);
        const errorMessage = { success: false, message: responcesMessage };
        yield put(Actions.responseAgreementUpdate(errorMessage));
      }
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseAgreementUpdate(errorMessage));
  }
}

function* fileUpload(action) {
  console.log(JSON.stringify("action" + action.data));

  try {
    const postResponse = yield postdatafileDmsa(Base_URL + action.url, action.data,"Bearer ".concat(
      window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN)));
      console.log(JSON.stringify(postResponse))
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responseFileUpload(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };

      yield put(Actions.responseFileUpload(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseFileUpload(errorMessage));
  }
}

function* createOrderData(action) {
  try {
    const postResponse = yield postSecureObject(Base_URL + action.url, action.data,"Bearer ".concat(
      window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN)));

    console.log("The response data is : \n" + JSON.stringify(postResponse));
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.responseCreateOrderData(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };

      yield put(Actions.responseCreateOrderData(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseFileUpload(errorMessage));
  }
}

function* paymentSuccess(action) {
  console.log(
    Base_URL + Constants.API_URLS.CREATE_INVOICES_PAYMENT_URL,
    JSON.stringify(action.responces)
  );
  try {
    //const postResponse = ""
    const postResponse = yield postSecureObject(
      Base_URL + Constants.API_URLS.CREATE_INVOICES_PAYMENT_URL,
      action.responces,"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log("The response payment is : \n" + JSON.stringify(postResponse));
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
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responsePaymentSuccess(errorMessage));
  }
}

export default function* dmasSaga() {
  yield takeLatest(Constants.UPDATE_AGREEMENT, agreementUpdate);
  yield takeLatest(Constants.REQUEST_FILE_UPLOAD, fileUpload);
  yield takeLatest(Constants.CREATE_ORDER_ID, createOrderData);
  yield takeLatest(
    Constants.DMSA_CREATE_INVOICES_PAYMENT_REQUEST,
    paymentSuccess
  );
}
