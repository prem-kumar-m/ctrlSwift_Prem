import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { fetchdataget, postSecureObject, postdata } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* addUser(action) {
  try {
    console.log("===========in saga============");
    const isDetailSuccess = yield postSecureObject(Base_URL + action.url, {
      employeeId: action.employeeId,
      partnerId: action.partnerId,
      firstName: action.firstName,
      lastName: action.lastName,
      gender: action.gender,
      email: action.email,
      mobile: action.mobile,
      mobileCountryCode: action.mobileCountryCode,
      qualification: action.qualification,
      specialization: action.specialization,
      experience: action.experience,
      country: action.country,
      address: action.address,
      city: action.city,
      stateName: action.stateName,
      pincode: action.pincode,
      idProof: action.idProof,
      addressProof: action.addressProof,
      panCard: action.panCard,
      aadharCard: action.aadharCard,
    });
    console.log(
      "===========in saga res============" + JSON.stringify(isDetailSuccess)
    );

    yield put(Actions.addUserResponse(isDetailSuccess));
  } catch (e) {
    yield put(Actions.addUserResponse([]));
  }
}
export default function* addUserSaga() {
  yield takeLatest(Constants.ADD_EMPLOYEE, addUser);
}
