import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { fetchdataget, postSecureObject, postdata } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* verifycommercialLogin(action) {
  console.log("--------------------- saga");
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.COMMERCIAL_LOGIN_VERIFY_URL,
      {
        email: action.email,
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
      yield put(Actions.verifycommercialLoginResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifycommercialLoginResponse(errorMessage));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E104"
    ) {
      const errorMessage = {
        success: false,
        message: "Email seems to be new",
      };
      yield put(Actions.verifycommercialLoginResponse(errorMessage));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E120"
    ) {
      const errorMessage = {
        success: false,
        message: "you are not seems to be admin",
      };
      yield put(Actions.verifycommercialLoginResponse(errorMessage));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E109"
    ) {
      const errorMessage = {
        success: false,
        message:
          "you already entered resend otp button two times. please go back to the page ",
      };
      yield put(Actions.verifycommercialLoginResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Invalid Credentials. Please check and try again",
    };
    yield put(Actions.verifycommercialLoginResponse(errorMessage));
  }
}

function* commercialOtpVerify(action) {
  console.log(
    "===================in saga===========" + JSON.stringify(action.otp)
  );
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.COMMERCIAL_LOGIN_VERIFY_OTP_URL,
      {
        email: action.otp.email,
        otp: action.otp.otp,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    console.log("===================in saga===========");
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.commercialOtpVerifyResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.commercialOtpVerifyResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not get the OTP. Plz try again.",
    };
    yield put(Actions.commercialOtpVerifyResponse(errorMessage));
  }
}
function* commercialResendOtp(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.LOGIN_RESEND_OTP_URL_COMMERCIAL,
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
      yield put(Actions.commercialResendOtpResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.commercialResendOtpResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.commercialResendOtpResponse(errorMessage));
  }
}

function* verifycommercialForgot(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.COMMERCIAL_FORGOTPASSWORD_URL,
      {
        email: action.forgotEmail,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifycommercialForgotResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log("error message testing");
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      console.log("error message testing", JSON.stringify(errorMessage));
      yield put(Actions.verifycommercialForgotResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };
    yield put(Actions.verifycommercialForgotResponse(errorMessage));
  }
}

function* forgotResendOtp(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.COMMERCIAL_RESENDOTP_URL,
      {
        email: action.forgotEmail,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.forgotResendOtpResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.forgotResendOtpResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.forgotResendOtpResponse(errorMessage));
  }
}

function* verifyForgotOtp(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.PARTNER_VERIFY_OTP_URL,
      {
        email: action.forgotEmail,
        otp: action.sendOtp,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyForgotOtpResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifyForgotOtpResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not get the OTP. Plz try again.",
    };
    yield put(Actions.verifyForgotOtpResponse(errorMessage));
  }
}

function* newPasswordData(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.COMMERCIAL_NEWPASSWORD_URL,
      {
        email: action.forgotEmail,
        newPassword: action.newPassword,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.newPasswordDataResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.newPasswordDataResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not get the OTP. Plz try again.",
    };
    yield put(Actions.newPasswordDataResponse(errorMessage));
  }
}

export default function*commercialLoginSaga() {
  yield takeLatest(Constants.VERIFY_COMMERCIAL_LOGIN, verifyPartnerLogin);
  yield takeLatest(Constants.COMMERCIAL_VERIFY_OTP_LOGIN,commercialOtpVerify);
  yield takeLatest(Constants.COMMERCIAL_LOGIN_RESEND_OTP_VERIFY,commercialResendOtp);
  yield takeLatest(Constants.COMMERCIAL_FORGOTPASSWORD_DATA, verifyPartnerForgot);
  yield takeLatest(
    Constants.COMMERCIAL_FORGOTPASSWORD_VERIFY_OTP,
    verifyForgotOtp
  );
  yield takeLatest(Constants.COMMERCIAL_RESENDOTP_VERIFY, forgotResendOtp);
  yield takeLatest(Constants.COMMERCIAL_NEWPASSWORD_VERIFY, newPasswordData);
}
