import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject } from "../../apil-call";
import { Base_URL } from "../../urls";

function* SmallbannerList() {
  console.log("saga + smallbanner ");
  try {
    const dataori = yield getSecureData(
      Base_URL + Constants.API_URLS.REQUEST_ALL_PRICE_LIST_URL
      );
    yield put(Actions.SmallbannerListResponse(dataori));
  } catch (e) {
    yield put(Actions.SmallbannerListResponse([]));
  }
}




export default function* SmallBannerSaga() {
  yield takeLatest(Constants.REQUEST_ALL_PRICE_LIST,SmallbannerList);

  console.log("Requesting from Users List saga");
}
