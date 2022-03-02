import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { fetchdataget, postSecureObject, postdata } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* verifyPartnerLogin(action) {
  console.log("--------------------- saga");
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.PARTNER_LOGIN_VERIFY_URL,
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
      yield put(Actions.verifyPartnerLoginResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifyPartnerLoginResponse(errorMessage));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E104"
    ) {
      const errorMessage = {
        success: false,
        message: "Email seems to be new",
      };
      yield put(Actions.verifyPartnerLoginResponse(errorMessage));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E120"
    ) {
      const errorMessage = {
        success: false,
        message: "you are not seems to be admin",
      };
      yield put(Actions.verifyPartnerLoginResponse(errorMessage));
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
      yield put(Actions.verifyPartnerLoginResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Invalid Credentials. Please check and try again",
    };
    yield put(Actions.verifyPartnerLoginResponse(errorMessage));
  }
}

function* partnerOtpVerify(action) {
  console.log(
    "===================in saga===========" + JSON.stringify(action.otp)
  );
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.PARTNER_LOGIN_VERIFY_OTP_URL,
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
      yield put(Actions.partnerOtpVerifyResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.partnerOtpVerifyResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not get the OTP. Plz try again.",
    };
    yield put(Actions.partnerOtpVerifyResponse(errorMessage));
  }
}
function* partnerResendOtp(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.LOGIN_RESEND_OTP_URL_PARTNER,
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
      yield put(Actions.partnerResendOtpResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.partnerResendOtpResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.partnerResendOtpResponse(errorMessage));
  }
}

function* verifyPartnerForgot(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.PARTNER_FORGOTPASSWORD_URL,
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
      yield put(Actions.verifyPartnerForgotResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log("error message testing");
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      console.log("error message testing", JSON.stringify(errorMessage));
      yield put(Actions.verifyPartnerForgotResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };
    yield put(Actions.verifyPartnerForgotResponse(errorMessage));
  }
}

function* forgotResendOtp(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.PARTNER_RESENDOTP_URL,
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
      Base_URL + Constants.API_URLS.PARTNER_NEWPASSWORD_URL,
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

export default function* partnerLoginSaga() {
  yield takeLatest(Constants.VERIFY_PARTNER_LOGIN, verifyPartnerLogin);
  yield takeLatest(Constants.PARTNER_VERIFY_OTP_LOGIN, partnerOtpVerify);
  yield takeLatest(Constants.PARTNER_LOGIN_RESEND_OTP_VERIFY, partnerResendOtp);
  yield takeLatest(Constants.PARTNER_FORGOTPASSWORD_DATA, verifyPartnerForgot);
  yield takeLatest(
    Constants.PARTNER_FORGOTPASSWORD_VERIFY_OTP,
    verifyForgotOtp
  );
  yield takeLatest(Constants.PARTNER_RESENDOTP_VERIFY, forgotResendOtp);
  yield takeLatest(Constants.PARTNER_NEWPASSWORD_VERIFY, newPasswordData);
}
