import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* requestAllTax(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    yield put(Actions.allTaxResponse(dataori.countryTaxRes));
  } catch (e) {
    yield put(Actions.allTaxResponse([]));
  }
}

function* addTaxs(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        country: action.countryName,
        serviceTax: action.servicesTaxPercentage,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.addTaxsResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log(responseData.data.message);
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addTaxsResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.addTaxsResponse(errorMessage));
  }
}

function* reqdeleteTaxs(action) {
  console.log(JSON.stringify(action));
  try {
    const postResponse = yield postSecureObject(
      Base_URL + action.url,
      {
        country: action.country.taxs,
        serviceTax: action.country.serviceTax,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    console.log("The response data is : " + JSON.stringify(postResponse));
    console.log(postResponse.data.message);
    if (
      postResponse.status === 200 &&
      postResponse.data.success !== "undefined" &&
      postResponse.data.success === true
    ) {
      yield put(Actions.deleteTaxsResponse(postResponse.data));
    } else if (
      postResponse.data.success !== "undefined" &&
      postResponse.data.success === false
    ) {
      console.log(postResponse.data.message);
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.deleteTaxsResponse(errorMessage));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.deleteTaxsResponse(errorMessage));
  }
}

export default function* serviceTaxSaga() {
  yield takeLatest(Constants.REQUEST_ALL_TAX, requestAllTax);
  yield takeLatest(Constants.ADD_TAXS, addTaxs);
  yield takeLatest(Constants.DELETE_TAXS, reqdeleteTaxs);

  console.log("Requesting from Users List saga");
}
