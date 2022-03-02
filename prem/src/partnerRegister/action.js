import { actionChannel } from "redux-saga/effects";
import * as Constants from "../constants";
import { stateValidator } from "../Core/utils";

export const submitpartner = (data) => (
  console.log("country Priya" + JSON.stringify(data)),
  {
    type: Constants.SUBMIT_PARTNER, //this will match with your saga
    url: Constants.API_URLS.SUBMIT_PARTNER_URL,
    data,
  }
);

export const submitpartnerresponse = (isSuccess) => (
  console.log("================in action response================="+JSON.stringify(isSuccess)),
  {
    type: Constants.SUBMIT_PARTNER_RESPONSE,
    isSuccess,
  }
);
