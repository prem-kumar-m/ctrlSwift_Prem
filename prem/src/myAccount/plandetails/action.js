import { actionChannel } from "redux-saga/effects";
import * as Constants from "../../constants";
import { stateValidator } from "../../Core/utils";

export const requestchangePlanList = () => ({
  type: Constants.REQUEST_LOAD_CUSTOMERID_LIST,
  url: Constants.API_URLS.CUSTOMERID_URL,
});

export const receiveloadchangePlanList = (user) => ({
  type: Constants.RECEIVE_LOAD_COSTOMERID_LIST,
  user,
});

export const requestplanDetial = (data) => ({
  type: Constants.REQUEST_PLAN_DETAILS,
  url: Constants.API_URLS.PLANDETAILS_URL,
  data,
});

export const receiveplanDetial = (plandetails) => ({
  type: Constants.RESPONCES_PLAN_DETAILS,
  plandetails,
});

//-----------------------------

export const requestchoosePlansList = () => ({
  type: Constants.REQUEST_LOAD_CHOOSEPLANS_LIST,
  url: Constants.API_URLS.CHOOSEPLANS_URL,
});

export const receiveloadchoosePlansList = (choosePlans) => ({
  type: Constants.RECEIVE_LOAD_CHOOSEPLANS_LIST,
  choosePlans,
});

export const requestchoosePlansListExtend = () => ({
  type: Constants.REQUEST_LOAD_CHOOSEPLANS_LIST_EXTEND,
  url: Constants.API_URLS.CHOOSEPLANS_EXTEND_URL,
});

export const receiveloadchoosePlansListExtend = (choosePlans2) => ({
  type: Constants.RECEIVE_LOAD_CHOOSEPLANS_LIST_EXTEND,
  choosePlans2,
});

export const contractUpdate = (email, planList, contractDuration) => (
  console.log("email"),
  {
    type: Constants.CONTRACT_UPDATE, //this will match with your saga
    url: Constants.API_URLS.LIST_CONTRACT_UPDATE_URL,
    email,
    planList,
    contractDuration,
  }
);

export const contractUpdateResponse = (isSuccess2) => ({
  type: Constants.CONTRACT_UPDATE_RESPONSE,
  isSuccess2,
});

export const contractTerminate = (email, planList, reason) => (
  console.log("email"),
  {
    type: Constants.CONTRACT_TERMINATE, //this will match with your saga
    url: Constants.API_URLS.LIST_CONTRACT_TERMINATE_URL,
    email,
    planList,
    reason,
  }
);

export const contractTerminateResponse = (isSuccess) => ({
  type: Constants.CONTRACT_TERMINATE_RESPONSE,
  isSuccess,
});

export const requestCheckNoticePeriod = (planDetials) => ({
  type: Constants.REQUEST_CHECK_NOTICE_PERIOD,
  url: Constants.API_URLS.NOTICE_PERIOD_URL,
  planDetials,
});

export const receiveCheckNoticePeriod = (NoticePeriod) => ({
  type: Constants.RECEIVE_CHECK_NOTICE_PERIOD,
  NoticePeriod,
});
