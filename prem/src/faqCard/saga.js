import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";

function* requestInquiryList(action) {
  try {
    console.log("===========in saga============");
    const isDetailsSuccess = yield postSecureObject(Base_URL + action.url, {
      name: action.name,
      email: action.email,
      organization: action.organization,
      mobileCountryCode: action.mobileCountryCode,
      mobileNumber: action.mobileNumber,
      region: action.region,
      enquiryType: action.enquiryType,
      message: action.message,
    });
    console.log(
      "===========in saga res============" + JSON.stringify(isDetailsSuccess)
    );

    yield put(Actions.receiveInquiryList(isDetailsSuccess));
  } catch (e) {
    yield put(Actions.receiveInquiryList([]));
  }
}
export default function* requestInquiryListSaga() {
  yield takeLatest(Constants.REQUEST_INQUIRY_LIST, requestInquiryList);
}
