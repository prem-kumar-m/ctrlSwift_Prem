import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { fetchdataget, postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* resendOtp(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.EDIT_RESEND_OTP_URL,
      {
        email: action.email,
      }
    );
    console.log(responseData);
    console.log(responseData.data);
    console.log(responseData.data.success);
    console.log(responseData.data.message);

    if (
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
      message:
        "Unable to get your request, please check your internet connection",
    };
    yield put(Actions.resendOtpResponse(errorMessage));
  }
}

function* verifyValidateOtp(action) {
  let responseData = "";
  console.log(JSON.stringify("action" + action.pincode));
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        email: action.email,

        otp: action.otp,
      })
  );
  try {
    responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.VERIFY_OTP_REGISTER_URL,

      {
        email: action.email,

        otp: action.otp,
      }
    );
    console.log(responseData.data.message);
    console.log(action.location);
    console.log("response data ------->" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyValidateOtpResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifyValidateOtpResponse(errorMessage));
    }
  } catch (e) {
    console.log("printing success at exception" + responseData);

    const errorMessage = {
      success: false,
      message: "Could not get the OTP. Please try again.",
    };
    yield put(Actions.verifyValidateOtpResponse(errorMessage));
  }
}
function* updateUser(action) {
  console.log(JSON.stringify("action" + JSON.stringify(action)));
  console.log(
    "testing" +
      Base_URL +
      "--" +
      action.url +
      "---" +
      JSON.stringify({
        firstName: action.firstName,
        lastName: action.lastName,
        mobile: action.mobile,
        email: action.email,
        department: action.department,
        mobileCountryCode: action.mobileCountryCode,
        landlineCountryCode: action.landlineCountryCode,
        landline: action.landLine,
        country: action.country,
        company: action.company,
        address: action.address,
        city: action.city,
        pincode: action.pincode,
        wantUpdate: action.num,
        tranferAdminAccessToEmail: action.transferemail,
        otp: action.otp,
      })
  );
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.EDIT_PROFILE_UPDATE_URL,
      {
        firstName: action.firstName,
        lastName: action.lastName,
        mobile: action.mobile,
        email: action.email,
        department: action.department,
        mobileCountryCode: action.mobileCountryCode,
        landlineCountryCode: action.landlineCountryCode,
        landline: action.landLine,
        country: action.country,
        company: action.company,
        address: action.address,
        city: action.city,
        pincode: action.pincode,
        wantUpdate: action.num,
        tranferAdminAccessToEmail: action.transferemail,
        otp: action.otp,
      },"Bearer ".concat(
        window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.updateUserResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.updateUserResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message:
        "Unable to get your request, please check your internet connection",
    };
    yield put(Actions.updateUserResponse(errorMessage));
  }
}

export default function* updateSaga() {
  yield takeLatest(Constants.VERIFY_OTP_REGISTER, verifyValidateOtp);
  yield takeLatest(Constants.EDIT_RESEND_OTP, resendOtp);
  yield takeLatest(Constants.EDIT_PROFILE_UPDATE, updateUser);
}
