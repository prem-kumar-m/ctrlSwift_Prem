import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postdata, postSecureObject ,postSecure} from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* verifyLogin(action) {
  try {
    console.log(JSON.stringify(action));
    const responseData = yield postSecureObject(Base_URL + action.url, {
      email: action.username,
      password: action.password,
    });
    console.log(
      "responseData" + responseData.data.success !== "undefined" &&
        responseData.data.success === false
    );
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
        token: window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN),
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

function* planDetailsList(action) {
  try {
    console.log(
      "planDetailslist saga layer " +
        action.id +
        "\n" +
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
    );
    const responseData = yield getSecureData(
      Base_URL + action.url,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
      )
    );

    console.log("responseData" + JSON.stringify(responseData));
    if (responseData.success !== "undefined" && responseData.success === true) {
      yield put(Actions.planDetailsResponces(responseData));
    } else if (
      responseData.success !== "undefined" &&
      responseData.success === false
    ) {
      console.log("testing");
      const responcesMessage = errorMessages(responseData.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.planDetailsResponces(errorMessage));
    }
  } catch (e) {
    console.log("testing" + e);
    const errorresponse = {
      success: false,
      message: "Could not Complete this ticket. Plz try later.",
    };
    yield put(Actions.planDetailsResponces(errorresponse));
  }
}

function* getAccountName(action) {
  try {
    console.log(
      action.customerId +
        "\n planDetailslist saga layer " +
        action.id +
        "\n" +
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
    );
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        customerId: action.customerId,
      },
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
      )
    );

    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.getAccountNameResponces(responseData.data));
    } else if (
      responseData.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log("testing");
      const responcesMessage = errorMessages(responseData.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.getAccountNameResponces(errorMessage));
    }
  } catch (e) {
    console.log("testing" + e);
    const errorresponse = {
      success: false,
      message: "Could not Complete this ticket. Plz try later.",
    };
    yield put(Actions.getAccountNameResponces(errorresponse));
  }
}

function* getSiteName(action) {
  try {
    console.log(
      "planDetailslist saga layer " +
      action.accountName +
        "\n" + action.customerId+"\n"+
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
    );
    const responseData = yield postSecureObject(
      Base_URL + action.url + action.accountName + "/" + action.customerId,"",
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
      )
    );

    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.getSiteNameResponces(responseData.data));
    } else if (
      responseData.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log("testing");
      const responcesMessage = errorMessages(responseData.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.getSiteNameResponces(errorMessage));
    }
  } catch (e) {
    console.log("testing" + e);
    const errorresponse = {
      success: false,
      message: "Could not Complete this ticket. Plz try later.",
    };
    yield put(Actions.getSiteNameResponces(errorresponse));
  }
}

function* requestToActivatePlanByProjectManage(action) {
  try {
    console.log(
      "planDetailslist saga layer " +
        action.requestActivatePlan +
        "\n" +
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
    );
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      action.requestActivatePlan,
      "Bearer ".concat(
        window.sessionStorage.getItem(Constants.PROJECT_MANAGER_ACCESS_TOKEN)
      )
    );

    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(
        Actions.responcesForActivatePlanByProjectManage(responseData.data)
      );
    } else if (
      responseData.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log("testing");
      const responcesMessage = errorMessages(responseData.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.responcesForActivatePlanByProjectManage(errorMessage));
    }
  } catch (e) {
    console.log("testing" + e);
    const errorresponse = {
      success: false,
      message: "Could not Complete this ticket. Plz try later.",
    };
    yield put(Actions.responcesForActivatePlanByProjectManage(errorresponse));
  }
}

export default function* projectManagerLoginSaga() {
 
  yield takeLatest(Constants.REQ_CLEAR_ACCESS_TOKENS, reqClearAccessTokens);
  yield takeLatest(Constants.PROJECT_MANAGER_VERIFY_LOGIN, verifyLogin);
  yield takeLatest(Constants.VERIFY_OTP_LOGIN, otpVerify);
  yield takeLatest(Constants.LOGIN_RESEND_OTP_VERIFY, resendOtp);

  //------------yetToInitiate-----------------

  yield takeLatest(Constants.YET_TO_INITIATE_DETAILS_REQUEST, planDetailsList);
  yield takeLatest(Constants.ACCOUNT_NAME_REQUEST, getAccountName);
  yield takeLatest(Constants.SITE_NAME_REQUEST, getSiteName);
  yield takeLatest(
    Constants.REQUEST_TO_ACTIVATE_PLAN_BY_PROJECT_MANAGE,
    requestToActivatePlanByProjectManage
  );
}
