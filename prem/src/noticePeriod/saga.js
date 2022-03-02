import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject, getdataObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* requestAllPlanNoticePeriod(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    yield put(Actions.allPlanNoticePeriodResponse(dataori.noticePeriodRes));
  } catch (e) {
    yield put(Actions.allPlanNoticePeriodResponse([]));
  }
}

function* submitAddNoticePeriod(action) {
  try {
    let responseData = "";
    if (action.mode !== "edit") {
      console.log("not edit");
      responseData = yield postSecureObject(
        Base_URL + action.url,
        {
          model: action.modelName,
          noOfDays: action.noticePeriodDays,
        },
        "Bearer ".concat(
          window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
        )
      );
    } else {
      console.log("edit");
      responseData = yield postSecureObject(
        Base_URL + action.url,
        {
          id: action.id,
          model: action.modelName,
          noOfDays: action.noticePeriodDays,
        },
        "Bearer ".concat(
          window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
        )
      );
    }

    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.addNoticePeriodResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log(responseData.data.message);
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addNoticePeriodResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.addNoticePeriodResponse(errorMessage));
  }
}

function* reqdeleteNoticePeriod(action) {
  console.log(JSON.stringify(action));
  try {
    const postResponse = yield postSecureObject(
      Base_URL + action.url + "/" + action.country.id,

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
      yield put(Actions.deleteNoticePeriodResponse(postResponse.data));
    } else if (
      postResponse.data.success !== "undefined" &&
      postResponse.data.success === false
    ) {
      console.log(postResponse.data.message);
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.deleteNoticePeriodResponse(errorMessage));
    }
  } catch (e) {
    console.log(
      "Theree is an exception in getting response data for Delete USER "
    );
    const errorMessage = { success: false, message: "Cannot delete user." };
    yield put(Actions.deleteNoticePeriodResponse(errorMessage));
  }
}

export default function* noticePeriodSaga() {
  yield takeLatest(
    Constants.REQUEST_ALL_NOTICE_PERIOD,
    requestAllPlanNoticePeriod
  );
  yield takeLatest(Constants.UPDATE_NOTICE_PERIOD, submitAddNoticePeriod);
  yield takeLatest(Constants.DELETE_NOTICE_PERIOD, reqdeleteNoticePeriod);

  console.log("Requesting from Users List saga");
}
