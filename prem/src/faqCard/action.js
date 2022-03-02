import { actionChannel } from "redux-saga/effects";
import * as Constants from "../constants";

export const requestInquiryList = (
  name,
  email,
  organization,
  mobileCountryCode,
  mobileNumber,
  region,
  enquiryType,
  message
) => ({
  type: Constants.REQUEST_INQUIRY_LIST,
  url: Constants.API_URLS.REQUEST_INQUIRY_LIST_URL,
  name,
  email,
  organization,
  mobileCountryCode,
  mobileNumber,
  region,
  enquiryType,
  message,
});

export const receiveInquiryList = (isDetailsSuccess) => ({
  type: Constants.RECEIVE_INQUIRY_LIST,
  isDetailsSuccess,
});
