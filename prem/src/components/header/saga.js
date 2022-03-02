import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata, postSecureObject } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* verifyCredentialCustomer(action) {
  console.log("action-----------" + JSON.stringify(action));
  console.log(JSON.stringify("action" + action.pincode));
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        email: action.email,
        password: action.password,
      })
  );
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.CUSTOMER_LOGIN_VERIFY_URL,
      {
        email: action.email,
        password: action.password,
      }
    );
    console.log("responseData-----------" + JSON.stringify(responseData));
    console.log(
      responseData.data.success !== "undefined" &&
        responseData.data.success === false
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyCredentialCustomerResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifyCredentialCustomerResponse(errorMessage));
    }
  } catch (e) {
    console.log(JSON.stringify(e));
    const errorMessage = {
      success: false,
      message:
        // "Unable to Login. Please check your internet connection and try again.",
        "Unable to Login. Please Contact Us"
    };
    yield put(Actions.verifyCredentialCustomerResponse(errorMessage));
  }
}

/*function* timezone(action) {
console.log(action.data)

  try{
    const timeZone=new Date(action.data);
    const responseData = yield postSecureObject(Base_URL + Constants.API_URLS.TIME_ZONE_URL,
      {
        "timeZone":timeZone,
        });
        console.log("responseData-----------"+JSON.stringify(responseData));
        if(responseData.data.success !== "undefined" && responseData.data.success === true) {
          yield put(Actions.verifytimezone(responseData));
      }
      
        else if( responseData.data.success !== "undefined" && responseData.data.success === false  ){
          const responcesMessage = errorMessages(responseData.data.message);
          const errorMessage = {'success' : false, 'message' : responcesMessage };
          yield put(Actions.verifytimezone(errorMessage));
        }
       
  } catch (e) {
    console.log(JSON.stringify(e))
    const errorMessage = {'success' : false, 'message' : 'Unable to Login. Please check your internet connection and try again.'};
    yield put(Actions.verifytimezone(errorMessage));
  }
}
*/

function* verifyEmailCustomer(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.FORGOTPASSWORD_CUSTOMER_URL,
      {
        email: action.getmail,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyEmailCustomerResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log(responseData.data.message);
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifyEmailCustomerResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };
    yield put(Actions.verifyEmailCustomerResponse(errorMessage));
  }
}

function* resendOtpCustomer(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.LOGIN_RESENDOTP_CUSTOMER_URL,
      {
        email: action.getmail,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.resendOtpCustomerResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.resendOtpCustomerResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.resendOtpCustomerResponse(errorMessage));
  }
}

function* forgotOtpCustomer(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.VERIFY_CUSTOMER_OTP_URL,
      {
        email: action.getmail,
        otp: action.otp,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.forgotOtpCustomerResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.forgotOtpCustomerResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not get the OTP. Plz try again.",
    };
    yield put(Actions.forgotOtpCustomerResponse(errorMessage));
  }
}

function* newPasswordCustomer(action) {
  console.log(Base_URL + Constants.API_URLS.RESETPASSWORD_CUSTOMER_URL, {
    email: action.getmail,
    newPassword: action.newpassword,
  });
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.RESETPASSWORD_CUSTOMER_URL,
      {
        email: action.getmail,
        newPassword: action.newpassword,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (responseData.status === 200) {
      yield put(Actions.newPasswordCustomerResponse(responseData.data));
    } else {
      const errorMessage = {
        success: false,
        message: "Could not reset the password, please try again",
      };
      yield put(Actions.newPasswordCustomerResponse(responseData));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not reset the password, please try again",
    };
    yield put(Actions.newPasswordCustomerResponse(errorMessage));
  }
}

export default function* loginSaga() {
  yield takeLatest(
    Constants.VERIFY_CUSTOMER_LOGIN_CREDENTIAL,
    verifyCredentialCustomer
  );
  //  yield takeLatest(Constants.TIME_ZONE, timezone);
  yield takeLatest(Constants.FORGOTPASSWORD_CUSTOMER_DATA, verifyEmailCustomer);
  yield takeLatest(
    Constants.FORGOTPASSWORD_CUSTOMER_VERIFY_OTP,
    forgotOtpCustomer
  );
  yield takeLatest(
    Constants.LOGIN_RESENDOTP_CUSTOMER_VERIFY,
    resendOtpCustomer
  );
  yield takeLatest(Constants.RESETPASSWORD_CUSTOMER_DATA, newPasswordCustomer);
}
