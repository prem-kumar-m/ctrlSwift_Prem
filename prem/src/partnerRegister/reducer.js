import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    company = "",
    // companyUrl = "",
    email = "",
    city = "",
    mobileCountryCode = "",
    mobile = "",
    address = "",
    pincode = "",
    states = "",
    country = "",
    gstNo = "",
    accountno = "",
    accountno2 = "",
    IFSC = "",
    Bank = "",
    Branch = "",
    Swift = "",
    file = "",
    isSuccess = any,
    landline = "",
    landlineCountryCode = "",
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.company = company;
      // statenew.companyUrl = companyUrl;
      statenew.email = email;
      statenew.mobileCountryCode = mobileCountryCode;
      statenew.mobile = mobile;
      // statenew.landlineCountryCode = landlineCountryCode;
      // statenew.landLine = landLine;
      statenew.address = address;
      statenew.city = city;
      statenew.pincode = pincode;
      statenew.states = states;
      statenew.country = country;
      statenew.gstNo = gstNo;
      statenew.accountno = accountno;
      statenew.accountno2 = accountno2;
      statenew.pincode = pincode;
      statenew.IFSC = IFSC;
      statenew.Bank = Bank;
      statenew.Branch = Branch;
      statenew.Swift = Swift;
      statenew.file = file;
      statenew.landline = landline;
      statenew.landlineCountryCode = landlineCountryCode;

      return statenew;
    }

    case Constants.SUBMIT_PARTNER_RESPONSE:
      console.log("++++++++" + JSON.stringify(isSuccess));
      {
        const statenew = { ...state };
        statenew.isSuccess = isSuccess;
        return statenew;
      }

    default:
      return state;
  }
};
