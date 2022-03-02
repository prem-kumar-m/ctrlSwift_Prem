import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject, getdataObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* requestAllPrice(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN))
    );
    console.log(JSON.stringify(dataori));
    yield put(Actions.allPriceResponse(dataori));
  } catch (e) {
    yield put(Actions.allPriceResponse([]));
  }
}

function* addPrice(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        plan: action.plan,
        model: action.model,
        price: action.price,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.addPriceResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };

      yield put(Actions.addPriceResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.addPriceResponse(errorMessage));
  }
}


function* requestChangeVariablePrice(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
       "ticketCostPrice":action.variablePrice,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    console.log(JSON.stringify(responseData))
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.responcesChangeVariablePrice(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };

      yield put(Actions.responcesChangeVariablePrice(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.responcesChangeVariablePrice(errorMessage));
  }
}


export default function* priceSaga() {
  yield takeLatest(Constants.REQUEST_ALL_PRICE, requestAllPrice);
  yield takeLatest(Constants.ADD_PRICE, addPrice);
  yield takeLatest(Constants.REQUEST_VARIABLE_PRICE, requestChangeVariablePrice);

  console.log("Requesting from Users List saga");
}
