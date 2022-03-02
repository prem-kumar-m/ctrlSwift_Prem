import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postdata } from "../apil-call";
import { Base_URL } from "../urls";

function* requestContactUs(action) {
  try {
    console.log(
      "Ticket details call from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        action.ticket +
        "\n" +
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
    );
    const dataori = yield postdata(Base_URL + action.url, action.ticket);
    console.log(
      "List of users from server ----------------\n" + JSON.stringify(dataori)
    );

    yield put(Actions.responseContactUs(dataori.data));
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.responseContactUs(errorMessage));
  }
}

export default function* contactUsSaga() {
  yield takeLatest(Constants.REQUEST_CONTACT_US, requestContactUs);
}
