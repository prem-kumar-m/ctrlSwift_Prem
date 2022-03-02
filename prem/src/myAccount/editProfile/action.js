import { actionChannel } from "redux-saga/effects";
import * as Constants from "../../constants";
import { stateValidator } from "../../Core/utils";

{
  /*export const profileUpdate = (firstName,lastName, email,department,mobileCountryCode,mobile,landlineCountryCode,landLine,company,address,country,city,pincode,transferemail,
  ) => (    console.log('email'),
  { 
    
  type: Constants.PROFILE_UPDATE,       //this will match with your saga
  url: Constants.API_URLS.LIST_EDIT_UPDATE_USER_URL,
  firstName,lastName, email,department,mobileCountryCode,mobile,landlineCountryCode,landLine,company,address,country,city,pincode,transferemail,});

export const profileUpdateResponse = isSuccess => ( {
  type: Constants.PROFILE_UPDATE_RESPONSE,
  isSuccess,
}
);*/
}
export const profileUpdate = (email) => (
  console.log("email"),
  {
    type: Constants.PROFILE_UPDATE, //this will match with your saga
    url: Constants.API_URLS.LIST_EDIT_UPDATE_USER_URL,
    email,
  }
);

export const profileUpdateResponse = (isSuccess) => ({
  type: Constants.PROFILE_UPDATE_RESPONSE,
  isSuccess,
});

export const requestloadcitybycountry = (country) => (
  console.log("country" + country),
  {
    type: Constants.REQUEST_LOAD_CITY_LIST_DATA,
    url: Constants.API_URLS.LIST_CITY_URL,
    country,
  }
);

export const receiveloadcitybycountry = (citylist) => ({
  type: Constants.RECEIVE_LOAD_CITY_LIST_DATA,
  citylist,
});

export const requestloadcitylist = (country) => (
  console.log("country" + country),
  {
    type: Constants.REQUEST_LOAD_CITY_LIST_DATA,
    url: Constants.API_URLS.LIST_CITY_URL,
    country,
  }
);

export const receiveloadcitylist = (citylist) => ({
  type: Constants.RECEIVE_LOAD_CITY_LIST_DATA,
  citylist,
});

export const requestloadprofileUpdate = (email) => (
  console.log("email" + email),
  {
    type: Constants.REQUEST_LOAD_UPDATE_USER_LIST_DATA,
    url: Constants.API_URLS.LIST_UPDATE_USER_URL,
    email,
  }
);

export const receiveloadprofileUpdate = (userlist) => ({
  type: Constants.RECEIVE_LOAD_UPDATE_USER_LIST_DATA,
  userlist,
});

//----------------------------------

export const updateUser = (
  firstName,
  lastName,
  email,
  department,
  mobileCountryCode,
  mobile,
  landlineCountryCode,
  landLine,
  company,
  address,
  country,
  city,
  pincode,
  transferemail,
  num,
  otp
) => (
  console.log(transferemail),
  {
    type: Constants.EDIT_PROFILE_UPDATE,
    url: Constants.API_URLS.EDIT_PROFILE_UPDATE_URL,
    firstName,
    lastName,
    email,
    department,
    mobileCountryCode,
    mobile,
    landlineCountryCode,
    landLine,
    company,
    address,
    country,
    city,
    pincode,
    transferemail,
    num,
    otp,
  }
);

export const updateUserResponse = (isUpdateSuccess) => ({
  type: Constants.EDIT_PROFILE_UPDATE_RESPONSE,
  isUpdateSuccess,
});

export const resendOtp = (email) => ({
  type: Constants.EDIT_RESEND_OTP,
  url: Constants.API_URLS.EDIT_RESEND_OTP_URL,
  email,
});

export const resendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.EDIT_RESEND_OTP_RESPONSE,
  resendOtpSuccess,
});


//-----------dashboard-------------------

export const requestloadData = (country) => (
  console.log("country" + country),
  {
    type: Constants.REQUEST_LOAD_PLAN_DETAILS,
    url: Constants.API_URLS.LOAD_PLAN_DETAILS,
    country,
  }
);

export const receiveloadData = (planData) => ((console.log(planData)),{
  type: Constants.RECEIVE_LOAD_PLAN_DETAILS,
  planData,
});

export const datechange = (data) => (
  console.log("country" + data),
  {
    type: Constants.REQUEST_LOAD_DATE_CHANGE_PLAN_DETAILS,
    url: Constants.API_URLS.LOAD_DATE_CHANGE_PLAN_DETAILS,
    data,
  }
);

export const receivedatechange = (datePlanData) => ({
  type: Constants.RECEIVE_LOAD_DATE_CHANGE_PLAN_DETAILS,
  datePlanData,
});