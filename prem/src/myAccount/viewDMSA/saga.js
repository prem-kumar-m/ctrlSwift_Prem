import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata, getdataObject } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* requestDmsaAnnexure(action) {
  console.log("action" + JSON.stringify(action));
  try {
    //const dataori = yield fetchdataget(Base_URL + action.url);
    const dataori = yield getdataObject(
      Base_URL +
        action.url +
        window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
    );
    console.log("dataori" + dataori.data);
    if (
      dataori.status === 200 &&
      dataori.data.success === true &&
      dataori.data.success !== undefined &&
      dataori.data.success !== null
    ) {
      yield put(Actions.receiveDmsaAnnexure(dataori.data));
    } else if (
      dataori.status === 200 &&
      dataori.data.success === false &&
      dataori.data.success !== undefined &&
      dataori.data.success !== null
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };

      yield put(Actions.receiveDmsaAnnexure(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };

    yield put(Actions.receiveDmsaAnnexure(errorMessage));
  }
}

export default function* dmasAnnexureSaga() {
  yield takeLatest(Constants.REQUEST_DMSA_ANNEXURE, requestDmsaAnnexure);
}
