import { actionChannel } from "redux-saga/effects";
import * as Constants from "../constants";
import { stateValidator } from "../Core/utils";

export const guestLogin = (
  firstName,
  lastName,
  mobile,
  email,
  department,
  mobileCountryCode,
  landlineCountryCode,
  landLine,
  country,
  company,
  address,
  city,
  pincode,
  wantUpdate,
  taxId,
  file
) => (
  console.log("country"),
  {
    type: Constants.GUEST_LOGIN, //this will match with your saga
    url: Constants.API_URLS.GUEST_LOGIN_URL,
    firstName,
    lastName,
    mobile,
    email,
    department,
    mobileCountryCode,
    landlineCountryCode,
    landLine,
    country,
    company,
    address,
    city,
    pincode,
    wantUpdate,
    taxId,
    file,
  }
);

export const guestLoginResponse = (isSuccess) => ({
  type: Constants.GUEST_LOGIN_RESPONSE,
  isSuccess,
});

export const requestloadcitybycountry = (country) => (
  console.log("country" + country),
  {
    type: Constants.REQUEST_LOAD_CITY_LIST_DATA_REG,
    url: Constants.API_URLS.LIST_CITY_URL,
    country,
  }
);

export const receiveloadcitybycountry = (citylist) => ({
  type: Constants.RECEIVE_LOAD_CITY_LIST_DATA_REG,
  citylist,
});

// {/*export const requestloadcitylist = (country) =>
//     ( console.log('country'+country),
//       {

//         type: Constants.REQUEST_LOAD_CITY_LIST_DATA,
//         url: Constants.API_URLS.LIST_CITY_URL,
//         country,
//     });

// export const receiveloadcitylist = citylist => ({
//     type: Constants.RECEIVE_LOAD_CITY_LIST_DATA,
//     citylist,
// });
// */}
export const requestloadcompany = (company) => (
  console.log("country" + company),
  {
    type: Constants.REQUEST_LOAD_COMPANY_LIST_DATA,
    url: Constants.API_URLS.LIST_COMPANIES_URL,
    company,
  }
);

export const receiveloadcompany = (companylist) => ({
  type: Constants.RECEIVE_LOAD_COMPANY_LIST_DATA,
  companylist,
});

export const requestcompanyid = ( company ) =>(
   console.log("----action---------company: "+company),
  {
      type: Constants.REQUEST_LOAD_COMPANY_ID,
      url: Constants.API_URLS.REQUEST_COMPANY_ID,
      company,
  }
);
export const receivecompanyid =(companyid) =>({
      type: Constants.RECEIVE_LOAD_COMPANY_ID,
      companyid,
});



export const verifyValidateOtp = (
  firstName,
  lastName,
  mobile,
  email,
  department,
  mobileCountryCode,
  landlineCountryCode,
  landLine,
  country,
  company,
  address,
  city,
  pincode,
  wantUpdate,
  taxId,
  otp
) => ({
  type: Constants.CUSTOMER_VERIFY_OTP_REGISTER,
  url: Constants.API_URLS.CUSTOMER_VERIFY_OTP_REGISTER_URL,
  firstName,
  lastName,
  mobile,
  email,
  department,
  mobileCountryCode,
  landlineCountryCode,
  landLine,
  country,
  company,
  address,
  city,
  pincode,
  wantUpdate,
  taxId,
  otp,
});

export const verifyValidateOtpResponse = (isValidatdOtpSuccess) => ({
  type: Constants.CUSTOMER_VERIFY_OTP_REGISTER_RESPONSE,
  isValidatdOtpSuccess,
});

export const resendOtp = (
  firstName,
  lastName,
  mobile,
  email,
  department,
  mobileCountryCode,
  landlineCountryCode,
  landLine,
  country,
  company,
  address,
  city,
  pincode,
  wantUpdate,
  taxId
) => ({
  type: Constants.GUEST_RESENDOTP_REGISTER_VERIFY,
  url: Constants.API_URLS.GUEST_RESENDOTP_REGISTER_URL,
  firstName,
  lastName,
  mobile,
  email,
  department,
  mobileCountryCode,
  landlineCountryCode,
  landLine,
  country,
  company,
  address,
  city,
  pincode,
  wantUpdate,
  taxId,
});

export const resendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.GUEST_RESENDOTP_REGISTER_RESPONSE,
  resendOtpSuccess,
});

//--------------------password-----------------------

export const newPassword = (
  //firstName,lastName,mobile,email,department,mobileCountryCode,landlineCountryCode,landLine,country,company,address,city,pincode,wantUpdate,taxId, otp,newpassword,file
  data
) => ({
  type: Constants.REGISTER_PASSWORD_DATA, //this will match with your saga
  url: Constants.API_URLS.REGISTER_PASSWORD_URL,
  //firstName,lastName,mobile,email,department,mobileCountryCode,landlineCountryCode,landLine,country,company,address,city,pincode, wantUpdate,taxId,otp,newpassword,file
  data,
});

export const newPasswordResponse = (isnewPasswordSuccess) => ({
  type: Constants.REGISTER_PASSWORD_RESPONCES,
  isnewPasswordSuccess,
});
