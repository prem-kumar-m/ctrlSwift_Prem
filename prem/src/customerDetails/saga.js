import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* planDetailsList(action) {
  try {
    console.log(
      "planDetialslist saga layer " +
        action.id +
        "\n" +
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
    );
    const responseData = yield getSecureData(
      Base_URL + action.url + "/" + action.id,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );

    console.log("responseData" + JSON.stringify(responseData));
    if (responseData.success !== "undefined" && responseData.success === true) {
      yield put(Actions.planDetialsResponces(responseData));
    } else if (
      responseData.success !== "undefined" &&
      responseData.success === false
    ) {
      console.log("testing");
      const responcesMessage = errorMessages(responseData.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.planDetialsResponces(errorMessage));
    }
  } catch (e) {
    console.log("testing" + e);
    const errorresponse = {
      success: false,
      message: "Could not Complete this ticket. Plz try later.",
    };
    yield put(Actions.planDetialsResponces(errorresponse));
  }
}

export default function* customerDetailsSaga() {
  yield takeLatest(Constants.PLAN_DETAILS_REQUEST, planDetailsList);
}
