import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { getSecureData } from "../../apil-call";
import { Base_URL } from "../../urls";

function* SRNRequest(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    console.log("dataori" + JSON.stringify(dataori));
    yield put(Actions.SRNResponse(dataori.reports));
  } catch (e) {
    yield put(Actions.SRNResponse([]));
  }
}



export default function* SRNSaga() {
  yield takeLatest(Constants.REQUEST_ALL_SRN_REPORTS, SRNRequest);
}
