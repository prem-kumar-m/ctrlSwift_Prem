import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    firstName = "",
    lastName = "",
    email = "",
    department = "",
    mobileCountryCode = "",
    mobile = "",
    landlineCountryCode = "",
    landLine = "",
    company = "",
    address = "",
    country = "",
    city = "",
    isUpdateSuccess = any,
    resendOtpSuccess = any,
    pincode = "",
    transferemail = "",
    citylist = [],
    isSuccess = any,
    userlist = "",
    planData = "",
    datePlanData ="",
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.firstName = firstName;
      statenew.lastName = lastName;
      statenew.email = email;
      statenew.department = department;
      statenew.mobileCountryCode = mobileCountryCode;
      statenew.mobile = mobile;
      statenew.landlineCountryCode = landlineCountryCode;
      statenew.landLine = landLine;
      statenew.company = company;
      statenew.address = address;
      statenew.country = country;
      statenew.city = city;
      statenew.pincode = pincode;
      statenew.transferemail = transferemail;

      return statenew;
    }

    case Constants.PROFILE_UPDATE_RESPONSE:
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
      }*/
      }

    case Constants.RECEIVE_LOAD_CITY_LIST_DATA:
      {
        console.log(
          " RECEIVE_LOAD_CITY_LIST_DATA receive data in reducer layer " +
            JSON.stringify(citylist)
        );
        const statenew = { ...state };
        statenew.citylist = citylist;
        return statenew;
      }
      {
        /*
    case Constants.RECEIVE_LOAD_COMPANY_LIST_DATA: {
      console.log(" RECEIVE_LOAD_COMPANY_LIST_DATA receive data in reducer layer " + JSON.stringify(companylist));
    const statenew = {...state};
    statenew.companylist = companylist;
    return statenew;
  }*/
      }

    case Constants.RECEIVE_LOAD_UPDATE_USER_LIST_DATA: {
      console.log(
        " RECEIVE_LOAD_USER_LIST_DATA receive data in reducer layer " +JSON.stringify(userlist));
      const statenew = { ...state };
      statenew.userlist = userlist;
      return statenew;
    }

    case Constants.EDIT_PROFILE_UPDATE_RESPONSE: {
      console.log("OTP" + JSON.stringify(isUpdateSuccess));
      const statenew = { ...state };
      statenew.isUpdateSuccess = isUpdateSuccess;
      return statenew;
    }

    case Constants.EDIT_RESEND_OTP_RESPONSE: {
      console.log("OTP" + JSON.stringify(resendOtpSuccess));
      const statenew = { ...state };
      statenew.resendOtpSuccess = resendOtpSuccess;
      return statenew;
    }

    case Constants.RECEIVE_LOAD_PLAN_DETAILS: {
      console.log("OTP" + JSON.stringify(planData));
      const statenew = { ...state };
      statenew.planData = planData;
      return statenew;
    }

    
    case Constants.RECEIVE_LOAD_DATE_CHANGE_PLAN_DETAILS: {
      console.log("OTP" + JSON.stringify(datePlanData));
      const statenew = { ...state };
      statenew.datePlanData = datePlanData;
      return statenew;
    }
    default:
      return state;
  }
};
