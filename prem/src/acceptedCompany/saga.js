import * as Constants from "../constants";
import * as Actions from "./action";
import { Base_URL } from "../urls";
import { put, takeLatest } from "redux-saga/effects";
import { getSecureData } from "../apil-call";

function* acceptedPartners(action) {
  try {
    console.log("===========in saga============");
    const companyName = yield getSecureData(Base_URL + action.url);
    console.log(
      "===========in saga res============" +
        JSON.stringify(companyName.acceptedPartners)
    );

    yield put(Actions.acceptedPartnersResponse(companyName.acceptedPartners));
  } catch (e) {
    yield put(Actions.acceptedPartnersResponse([]));
  }
}
export default function* acceptedPartnersSaga() {
  yield takeLatest(Constants.ACCEPTED_PARTNERS, acceptedPartners);
}
