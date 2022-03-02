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

function* submitselfemp(action) {
  console.log("================in =================");
  // console.log(JSON.stringify("action" + action.pincode));
  console.log(
    "testing" + Base_URL + "--" + action.url + "---" + JSON.stringify({})
  );
  try {
    const responseData = yield postdatafile(
      Base_URL + Constants.API_URLS.SUBMIT_SELFEMP_URL,

      action.data
    );
    console.log(
      "---------->response data ------->" + JSON.stringify(responseData)
    );
    if (
      // responseData.data.success !== "undefined" &&
      // responseData.data.success === true &&
      responseData.data.success === 200
    ) {
      yield put(Actions.submitselfempresponse(responseData.data));
    } 
    else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E124"
    ) {
      const errorMessage = {
        success: false,
        message: "Email Id Already Exist, Please Check!",
      };
      yield put(Actions.submitselfempresponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "please check your internet connection",
    };
    yield put(Actions.submitselfempresponse(errorMessage));
  }
}

function* verifyAadharNumber(action) {
  try {
    console.log(
      "Ticket details call from DB in saga layer User List -> " +
        Base_URL +
        action.url +
        action.aadharNumber
    );
    
    const responseData = yield postdata(
      Base_URL + action.url + action.aadharNumber
    );
    console.log(
      "---------->response data ------->" + JSON.stringify(responseData)
    );
    if (
      // responseData.data.success !== "undefined" &&
      // responseData.data.success === true &&
      responseData.status === 200
    ) {
      yield put(Actions.verifyAadharNumberResponse(responseData));
    }    
    
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "please check your internet connection",
    };
    yield put(Actions.verifyAadharNumberResponse(errorMessage));
    
  }
}


export default function* selfempRegistersaga() {
  yield takeLatest(Constants.SUBMIT_SELFEMP, submitselfemp);
  yield takeLatest(Constants.VERIFY_AADHAR, verifyAadharNumber);
}
