import * as Constants from "../constants";

export const planDetialsRequest = (id) => ({
  type: Constants.PLAN_DETAILS_REQUEST,
  url: Constants.API_URLS.PLAN_DETAILS_REQUEST_URL,
  id,
});

export const planDetialsResponces = (planList) => ({
  type: Constants.PLAN_DETAILS_RESPONCES,
  planList,
});
