import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    firstName = "",
    lastName = "",
    mobile = "",
    landlineCountryCode = "",
    email = "",
    department = "",
    country = "",
    city = "",
    address = "",
    mobileCountryCode = "",
    company = "",
    landLine = "",
    pincode = "",
    wantUpdate = "",
    taxId = "",
    citylist = [],
    companylist = [],
    companyid="",
    isSuccess = any,
    isnewPasswordSuccess = any,
    isValidatdOtpSuccess = any,
    resendOtpSuccess = any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.firstName = firstName;
      statenew.lastName = lastName;
      statenew.mobile = mobile;
      statenew.email = email;
      statenew.department = department;
      statenew.mobileCountryCode = mobileCountryCode;
      statenew.landlineCountryCode = landlineCountryCode;
      statenew.landLine = landLine;
      statenew.country = country;
      statenew.company = company;
      statenew.address = address;
      statenew.city = city;
      statenew.pincode = pincode;
      statenew.wantUpdate = wantUpdate;
      statenew.taxId = taxId;
      statenew.companyid = companyid;
      return statenew;
    }

    case Constants.GUEST_LOGIN_RESPONSE:
      {
        const statenew = { ...state };
        statenew.isSuccess = isSuccess;
        return statenew;
      }

      {
        /*case Constants.RECEIVE_LOAD_CITY_DATA: {
        const statenew = {...state};
        statenew.citylist = citylist;
        return statenew;
      }
    */
      }

    case Constants.RECEIVE_LOAD_CITY_LIST_DATA_REG: {
      console.log(
        " RECEIVE_LOAD_CITY_LIST_DATA receive data in reducer layer " +
          JSON.stringify(citylist)
      );
      const statenew = { ...state };
      statenew.citylist = citylist;
      return statenew;
    }

    case Constants.RECEIVE_LOAD_COMPANY_LIST_DATA: {
      console.log(
        " RECEIVE_LOAD_COMPANY_LIST_DATA receive data in reducer layer " +
          JSON.stringify(companylist)
      );
      const statenew = { ...state };
      statenew.companylist = companylist;
      return statenew;
    }
    //-------------------------otp screen===============
    case Constants.CUSTOMER_VERIFY_OTP_REGISTER_RESPONSE: {
      console.log("OTP" + JSON.stringify(isValidatdOtpSuccess));
      const statenew = { ...state };
      statenew.isValidatdOtpSuccess = isValidatdOtpSuccess;

      return statenew;
    }

    case Constants.GUEST_RESENDOTP_REGISTER_RESPONSE: {
      console.log("OTP" + JSON.stringify(resendOtpSuccess));
      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    //-----------------------------password--------------------

    case Constants.REGISTER_PASSWORD_RESPONCES: {
      const statenew = { ...state };
      console.log("OTP" + JSON.stringify(isnewPasswordSuccess));
      statenew.isnewPasswordSuccess = isnewPasswordSuccess;

      return statenew;
    }
    case Constants.RECEIVE_LOAD_COMPANY_ID: {
      const statenew = { ...state };
      console.log("OTP" + JSON.stringify(companyid));
      statenew.companyid = companyid;

      return statenew;
    }

    default:
      return state;
  }
};
