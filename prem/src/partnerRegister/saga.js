import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import {
  postSecureObject,
  postdatafile,
  getSecureData,
  postdata,
  postdatafiles,
  postdataFile,
} from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* submitpartner(action) {
  console.log("================in =================");
  // console.log(JSON.stringify("action" + action.pincode));
  console.log(
    "testing" + Base_URL + "--" + action.url + "---" + JSON.stringify({})
  );
  try {
    const responseData = yield postdatafile(
      Base_URL + Constants.API_URLS.SUBMIT_PARTNER_URL,

      action.data
    );
    console.log(
      "---------->response data ------->" + JSON.stringify(responseData)
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
      // responseData.data.success === true
    ) {
      yield put(Actions.submitpartnerresponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E313"
    ) {
      const errorMessage = {
        success: false,
        message: "company Already Registered.",
      };
      yield put(Actions.submitpartnerresponse(errorMessage));
    }
    else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E310"
    ) {
      const errorMessage = {
        success: false,
        message: "Files not created.",
      };
      yield put(Actions.submitpartnerresponse(errorMessage));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E238"
    ) {
      const errorMessage = {
        success: false,
        message: "Unable to insert records in database",
      };
      yield put(Actions.submitpartnerresponse(errorMessage));
    }
    else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E124"
    ) {
      const errorMessage = {
        success: false,
        message: "Email is already taken!",
      };
      yield put(Actions.submitpartnerresponse(errorMessage));
    }
    
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "please check your internet connection",
    };
    yield put(Actions.submitpartnerresponse(errorMessage));
  }
}

export default function* partnerRegistersaga() {
  yield takeLatest(Constants.SUBMIT_PARTNER, submitpartner);
}
