import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData } from "../apil-call";
import { Base_URL } from "../urls";

function* requestAllDetails(action) {
  try {
    console.log(
      "Ticket details call from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        action.ticket +
        "\n" +
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
    );
    //const dataori = yield fetchdataget(Base_URL + action.url + action.ticket);
    const dataori = yield getSecureData(
      Base_URL + action.url + action.ticket,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.SALES_ACCESS_TOKEN)
      )
    );
    //const dataori = yield getdataObject(Base_URL + action.url + action.ticket);
    console.log(
      "List of users from server ----------------\n" + JSON.stringify(dataori)
    );

    yield put(Actions.allDetailsResponse(dataori));
    /* if (dataori.requestDetails !== undefined && dataori.requestDetails !== null) {
      console.log('setting response.....................');
      if(dataori.inviteesDetails !== undefined && dataori.inviteesDetails !== null) {
        console.log('there are invitees.....................' + JSON.stringify(dataori.inviteesDetails));
        yield put(Actions.allDetailsResponse(dataori.listDemoDetails));
      } else {
        console.log('there are NO invitees.....................' + JSON.stringify(dataori.requestDetails));
        yield put(Actions.allDetailsResponse(dataori.listDemoDetails, []));
      }
    } else {
      yield put(Actions.allDetailsResponse([],[]));
    }*/
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.allDetailsResponse(errorMessage));
  }
}

export default function* detailsSaga() {
  yield takeLatest(Constants.REQUEST_ALL_DETAILS, requestAllDetails);

  console.log("Requesting from Ticket Detail saga");
}
