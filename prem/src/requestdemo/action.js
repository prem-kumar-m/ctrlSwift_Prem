import * as Constants from "../constants";

export const requestloadtimezone = (timezone) => ({
  type: Constants.REQUEST_LOAD_TIMEZONE_LIST_DATA,
  url: Constants.API_URLS.LIST_TIMEZONE_URL,
  timezone,
});

export const receiveloadtimezonelist = (timezonelist) => ({
  type: Constants.RECEIVE_LOAD_TIMEZONE_LIST_DATA,
  timezonelist,
});

export const requestloadtimeslot = (timezone) => ({
  type: Constants.REQUEST_LOAD_TIMESLOT_LIST_DATA,
  url: Constants.API_URLS.LIST_TIMESLOT_URL,
  timezone,
});

export const receiveloadtimeslotlist = (timeslotlist) => (console.log(JSON.stringify(timeslotlist)),{
  type: Constants.RECEIVE_LOAD_TIMESLOT_LIST_DATA,
  timeslotlist,
});

export const requestDemo = (demo) => ({
  type: Constants.REQUEST_DEMO,
  url: Constants.API_URLS.REQUEST_DEMO_URL,
  demo,
});

export const responcesDemo = (demoStatus) => ({
  type: Constants.RECEIVE_DEMO,
  demoStatus,
});
