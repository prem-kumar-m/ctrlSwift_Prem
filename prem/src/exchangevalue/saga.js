import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* requestAllRate(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    yield put(Actions.allRateResponse(dataori.exchangeRateList));
  } catch (e) {
    yield put(Actions.allRateResponse([]));
  }
}

function* addRate(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        currencyCode: action.currencyCode,
        exchangeRate: action.exchangeRate,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.addRateResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addRateResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.addRateResponse(errorMessage));
  }
}

export default function* rateSaga() {
  yield takeLatest(Constants.REQUEST_ALL_RATE, requestAllRate);
  yield takeLatest(Constants.ADD_RATE, addRate);

  console.log("Requesting from Users List saga");
}
