import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData } from "../apil-call";
import { Base_URL } from "../urls";

// function* loadusers(action) {
//     try {
//         //const dataori = yield fetchdataget(Base_URL + action.url);
//         const dataori = yield getSecureData(Base_URL + action.url, 'Bearer '.concat(window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)));
//         yield put(Actions.receiveloadusers(dataori.totalRegisteredUsers));
//     } catch (e) {
//         yield put(Actions.receiveloadusers([]));
//     }
// }

// function* loadshowroomlist(action) {
//     try {
//        // console.log("fetchdata from DB in saga layer");
//         //const dataori = yield fetchdataget(Base_URL + action.url);
//         const dataori = yield getSecureData(Base_URL + action.url, 'Bearer '.concat(window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)));
//         console.log("Response is showroom---------->" + JSON.stringify(dataori));
//         yield put(Actions.receiveloadshowroomlist(dataori.listShowrooms));
//     } catch (e) {
//         yield put(Actions.receiveloadshowroomlist([]));
//     }
// }
function* requestAllReports(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      )
    );
    console.log("dataori" + JSON.stringify(dataori));
    window.sessionStorage.setItem("New",dataori.newRequestCount)
    window.sessionStorage.setItem("Completed",dataori.completedCount)
    window.sessionStorage.setItem("Pending",dataori.pendingCount)
    yield put(Actions.allReportsResponse(dataori.reports));
  } catch (e) {
    yield put(Actions.allReportsResponse([]));
  }
}



export default function* reportSaga() {
  yield takeLatest(Constants.REQUEST_ALL_REPORTS, requestAllReports);
}
