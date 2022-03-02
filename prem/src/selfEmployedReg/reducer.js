import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    firstName = "",
    lastName = "",
    gender = "",
    email = "",
    mobileCountryCode = "",
    mobile = "",
    qualification = "",
    specialization = "",
    experience = "",
    address = "",
    city = "",
    stateName = "",
    pincode = "",
    aadharNumber = "",
    panCard = "",
    aadharCard = "",
    experienceCertificate = "",
    addressProof = "",
    bankName = "",
    branchName = "",
    accountNumber = "",
    ifscCode = "",
    swiftCode = "",
    cancelledChequeLeaf = "",
    bankPassbook = "",
    isSelfSuccess = any,
    isAadharSuccess=any,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.firstName = firstName;
      statenew.lastName = lastName;
      statenew.gender = gender;
      statenew.email = email;

      statenew.mobileCountryCode = mobileCountryCode;
      statenew.mobile = mobile;
      statenew.qualification = qualification;
      statenew.specialization = specialization;
      statenew.experience = experience;
      // statenew.landlineCountryCode = landlineCountryCode;
      // statenew.landLine = landLine;
      statenew.address = address;
      statenew.city = city;
      statenew.pincode = pincode;
      statenew.stateName = stateName;

      statenew.accountNumber = accountNumber;
      statenew.experienceCertificate = experienceCertificate;
      statenew.aadharNumber = aadharNumber;
      statenew.panCard = panCard;
      statenew.aadharCard = aadharCard;
      statenew.addressProof = addressProof;
      statenew.ifscCode = ifscCode;
      statenew.bankName = bankName;
      statenew.branchName = branchName;
      statenew.swiftCode = swiftCode;
      statenew.cancelledChequeLeaf = cancelledChequeLeaf;
      statenew.bankPassbook = bankPassbook;
      return statenew;
    }

    case Constants.SUBMIT_SELFEMP_RESPONSE:
      console.log("++++++++" + JSON.stringify(isSelfSuccess));
      {
        const statenew = { ...state };
        statenew.isSelfSuccess = isSelfSuccess;
        return statenew;
      }

      case Constants.VERIFY_AADHAR_RESPONSE:
      console.log("++++++++" + JSON.stringify(isAadharSuccess));
      {
        const statenew = { ...state };
        statenew.isAadharSuccess = isAadharSuccess;
        return statenew;
      }


    default:
      return state;
  }
};
