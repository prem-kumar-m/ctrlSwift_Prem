import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postSecureObject, getSecureData } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* profileUpdate(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.LIST_EDIT_UPDATE_USER_URL,
      {
        email: action.email,
      }
    );
    console.log("response data ------->" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.profileUpdateResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.profileUpdateResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not get the OTP. Please try again.",
    };
    yield put(Actions.profileUpdateResponse(errorMessage));
  }
}

function* loadcity(action) {
  try {
    console.log(
      "Get all cities URL -->" + Base_URL + action.url + action.country
    );
    const dataori = yield postSecureObject(
      Base_URL + Constants.API_URLS.LIST_CITY_URL,
      {
        country: action.country,
      }
    );
    console.log("response for cities is ->" + JSON.stringify(dataori));
    yield put(Actions.receiveloadcitybycountry(dataori.data));
  } catch (e) {
    yield put(Actions.receiveloadcitybycountry([]));
  }
}

function* requestloadData(action) {
  try {
    console.log(
      "Get all cities URL -->" +  Base_URL + Constants.API_URLS.LOAD_PLAN_DETAILS+Constants.ACCESS_CUSTOMERID,window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN)
    );
    const dataori = yield getSecureData(
      Base_URL +
       Constants.API_URLS.LOAD_PLAN_DETAILS+window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID),"Bearer ".concat(
                window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
     
    );
    console.log("response for loadData is ->" + JSON.stringify(dataori));
    if (
      dataori.success !== "undefined" &&
      dataori.success === true
    ) {
    yield put(Actions.receiveloadData(dataori));
    } else if (
      dataori.success !== "undefined" &&
      dataori.success === false
    ) {
      const responcesMessage = errorMessages(dataori.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.receiveloadData(errorMessage));
    }
  } catch (e) {
    yield put(Actions.receiveloadData([]));
  }
}

function* datechange(action) {
  try {
    console.log(JSON.stringify(action.data))
    console.log(
      "Get all cities URL -->" +        Base_URL + Constants.API_URLS.LOAD_DATE_CHANGE_PLAN_DETAILS+window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
      +"/"+action.data.fromdate+"/"+action.data.todate 
    );
    const dataori = yield getSecureData(
      Base_URL + Constants.API_URLS.LOAD_DATE_CHANGE_PLAN_DETAILS+window.sessionStorage.getItem(Constants.ACCESS_CUSTOMERID)
     +"/"+action.data.fromDate+"/"+action.data.toDate,"Bearer ".concat(
              window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log("response for loadData is ->" + JSON.stringify(dataori));
    yield put(Actions.receivedatechange(dataori));
  } catch (e) {
    yield put(Actions.receivedatechange([]));
  }
}


function* loaduser(action) {
  try {
    const dataori = yield getSecureData(
      Base_URL +
        action.url 
        +window.sessionStorage.getItem(Constants.ACCESS_EMAIL)
        ,"Bearer ".concat(
         window.sessionStorage.getItem(Constants.CLIENT_ACCESS_TOKEN))
    );
    console.log("response for email is ->" + JSON.stringify(dataori));
    yield put(Actions.receiveloadprofileUpdate(dataori));
  } catch (e) {
    yield put(Actions.receiveloadprofileUpdate([]));
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
    console.log(responseData);
    console.log(JSON.stringify(responseData.data));
    console.log(responseData.data.success);
    console.log(responseData.data.message);
    console.log("testing3");
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

export default function* editProfilesaga() {
  yield takeLatest(Constants.PROFILE_UPDATE, profileUpdate);
  yield takeLatest(Constants.REQUEST_LOAD_CITY_LIST_DATA, loadcity);
  yield takeLatest(Constants.REQUEST_LOAD_UPDATE_USER_LIST_DATA, loaduser);
  //-------------------------------------
  yield takeLatest(Constants.EDIT_RESEND_OTP, resendOtp);
  yield takeLatest(Constants.EDIT_PROFILE_UPDATE, updateUser);

  //--------------------dashBoard------------------------

  yield takeLatest(Constants.REQUEST_LOAD_PLAN_DETAILS, requestloadData);
  yield takeLatest(Constants.REQUEST_LOAD_DATE_CHANGE_PLAN_DETAILS, datechange);
}
