import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { getSecureData } from "../../apil-call";
import { Base_URL } from "../../urls";

function* requestticketslist(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL + action.url,
    //   "Bearer ".concat(
    //     window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
    //   )
    );
    console.log("dataori" + JSON.stringify(dataori));
    yield put(Actions.allTicketsResponse(dataori.ticketslist));
  } catch (e) {
    yield put(Actions.allTicketsResponse([]));
  }
}



export default function* TicketsSaga() {
  yield takeLatest(Constants.REQUEST_ALL_TICKETS, requestticketslist);
}
