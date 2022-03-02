import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* requestAllDiscount(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    yield put(Actions.allDiscountResponse(dataori.discountList));
  } catch (e) {
    yield put(Actions.allDiscountResponse([]));
  }
}

function* addDiscount(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        subscription: action.subscription,
        discount: action.discount,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.addDiscountResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addDiscountResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.addDiscountResponse(errorMessage));
  }
}

export default function* discountSaga() {
  yield takeLatest(Constants.REQUEST_ALL_DISCOUNT, requestAllDiscount);
  yield takeLatest(Constants.ADD_DISCOUNT, addDiscount);

  console.log("Requesting from Users List saga");
}
