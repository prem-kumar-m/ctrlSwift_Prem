import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import {
  postSecureObject,
  postdatafile,
  getSecureData,
  postdata,
} from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* guestLgoin(action) {
  console.log(JSON.stringify("action" + action.pincode));
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
        wantUpdate: action.wantUpdate,
        taxId: action.taxId,
        companyLogo: action.file,
      })
  );
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.GUEST_LOGIN_URL,
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
        wantUpdate: action.wantUpdate,
        taxId: action.taxId,
        file: action.file,
      }
    );
    console.log("response data ------->" + JSON.stringify(responseData));
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.guestLoginResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E101"
    ) {
      const errorMessage = {
        success: false,
        message: "Your Email Id has an existing account,Please login",
      };
      yield put(Actions.guestLoginResponse(errorMessage));
    }

    else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false &&
      responseData.data.message === "E306"
    ) {
      const errorMessage = {
        success: false,
        message: "Company name is Already registered . Entered details will send to your company admin ,After verified by your admin we will reach you through mail",
      };
      yield put(Actions.guestLoginResponse(errorMessage));
    }

  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.guestLoginResponse(errorMessage));
  }
}

{
  /*function* loadcitylist(action) {
  console.log(JSON.stringify('action'+action.country));

  try {
      console.log("fetchdata from DB in saga layer");

      //const dataori = yield fetchdataget(Base_URL + action.url);
      const dataori = yield getSecureData(Base_URL + action.url+ '/'+action.country,);
      console.log("countryChecking----------"+action.country);

      console.log("Response is ---------->" + JSON.stringify(dataori));
      yield put(Actions.receiveloadcitylist(dataori.cities));
  } catch (e) {
      yield put(Actions.receiveloadcitylist([]));
  }
}
*/
}

function* loadcity(action) {
  try {
    console.log(
      "Get all cities URL%%%%% -->" +
        Base_URL +
        Constants.API_URLS.LIST_CITY_URL +
        JSON.stringify({
          country: action.country,
        })
    );
    const dataori = yield postdata(
      Base_URL + Constants.API_URLS.LIST_CITY_URL,
      {
        country: action.country,
      }
    );
    console.log("response for cities is ->" + JSON.stringify(dataori.data));
    yield put(Actions.receiveloadcitybycountry(dataori.data));
  } catch (e) {
    yield put(Actions.receiveloadcitybycountry([]));
  }
}

function* loadcompany(action) {
  try {
    console.log("Get all company URL -->" + Base_URL + action.url);
    const dataori = yield getSecureData(Base_URL + action.url);
    console.log(
      "response for company is ->" + JSON.stringify(dataori.companies)
    );
    yield put(Actions.receiveloadcompany(dataori.companies));
  } catch (e) {
    yield put(Actions.receiveloadcompany([]));
  }
}


function* requestcompanyid(action) {
  try {
    console.log("Get all company URL -->" + Base_URL + action.url);
    const dataori = yield postdata(
      Base_URL + Constants.API_URLS.REQUEST_COMPANY_ID,
      {
        company: action.company,
      }
    );
    console.log(
      "response for company is ->" + JSON.stringify(dataori.data)
    );
    yield put(Actions.receivecompanyid(dataori.data));
  } catch (e) {
    yield put(Actions.receivecompanyid([]));
  }
}

function* resendOtp(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.GUEST_RESENDOTP_REGISTER_URL,
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
        wantUpdate: action.wantUpdate,
        taxId: action.taxId,
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

//---------------------------------------OTP SCREEN -----------------------------
function* verifyValidateOtp(action) {
  console.log("OTP SCREEN");
  let responseData = "";

  try {
    responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.VERIFY_OTP_REGISTER_URL,

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
        wantUpdate: action.wantUpdate,
        taxId: action.taxId,
        otp: action.otp,
      }
    );
    console.log(responseData.data.message);
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

//---------------------password --------------------

function* newPassword(action) {
  console.log(JSON.stringify("action" + action.data));
  console.log(localStorage.getItem("file"));

  try {
    const responseData = yield postdatafile(
      Base_URL + Constants.API_URLS.REGISTER_PASSWORD_URL,
      action.data
    );
    console.log("response data ------->" + JSON.stringify(responseData));

    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.newPasswordResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log("success");
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      // const errorMessage = {'success' : false, 'message' : "Server Error. Your Request cannot be processed to register user."};
      yield put(Actions.newPasswordResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Register, please check your internet connection",
    };
    yield put(Actions.newPasswordResponse(errorMessage));
  }
}



export default function* registrationsaga() {
  yield takeLatest(Constants.GUEST_LOGIN, guestLgoin);
  yield takeLatest(Constants.REQUEST_LOAD_COMPANY_ID,requestcompanyid);
  //yield takeLatest(Constants.REQUEST_LOAD_CITY_LIST_DATA, loadcitylist);
  yield takeLatest(Constants.REQUEST_LOAD_CITY_LIST_DATA_REG, loadcity);
  yield takeLatest(Constants.REQUEST_LOAD_COMPANY_LIST_DATA, loadcompany);
  yield takeLatest(Constants.CUSTOMER_VERIFY_OTP_REGISTER, verifyValidateOtp);
  yield takeLatest(Constants.GUEST_RESENDOTP_REGISTER_VERIFY, resendOtp);
  yield takeLatest(Constants.REGISTER_PASSWORD_DATA, newPassword);
}
