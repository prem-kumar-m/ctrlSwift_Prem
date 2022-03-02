import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { fetchdataget, postSecureObject, postdata } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* verifyLogin(action) {
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.LOGIN_VERIFY_URL,
      {
        email: action.username,
        password: action.password,
      }
    );
    console.log("responseData" + responseData);
    console.log("111111111" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyLoginResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifyLoginResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Invalid Credentials. Please check and try again",
    };
    yield put(Actions.verifyLoginResponse(errorMessage));
  }
}

function* reqClearAccessTokens(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.REQ_CLEAR_TOKENS_URL,
      {
        token: window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN),
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.recClearAccessTokens(responseData.data));
    } else {
      const errorMessage = {
        success: false,
        message: "Clearing Access Tokens is unsuccessful.",
      };
      yield put(Actions.recClearAccessTokens(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.recClearAccessTokens(errorMessage));
  }
}

function* otpVerify(action) {
  console.log(JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.LOGIN_VERIFY_OTP_URL,
      {
        email: action.otp.email,
        otp: action.otp.otp,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.otpVerifyResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.otpVerifyResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not get the OTP. Plz try again.",
    };
    yield put(Actions.otpVerifyResponse(errorMessage));
  }
}

function* resendOtp(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.LOGIN_RESEND_OTP_URL,
      {
        email: action.email,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.resendOtpResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.resendOtpResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.resendOtpResponse(errorMessage));
  }
}

export default function* loginSaga() {
  yield takeLatest(Constants.REQ_CLEAR_ACCESS_TOKENS, reqClearAccessTokens);
  yield takeLatest(Constants.VERIFY_LOGIN, verifyLogin);
  yield takeLatest(Constants.VERIFY_OTP_LOGIN, otpVerify);
  yield takeLatest(Constants.LOGIN_RESEND_OTP_VERIFY, resendOtp);
}
