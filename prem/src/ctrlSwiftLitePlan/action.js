import * as Constants from "../constants";

export const requestPlanPrice = (plan,paymentTerms) => (
  console.log("action........."+paymentTerms,plan),
  {
  type: Constants.REQUEST_DYNAMIC_PRICE_FOR_PLAN,
  url: Constants.API_URLS.REQUEST_DYNAMIC_PRICE_FOR_PLAN,
  plan,
  paymentTerms
});

export const requestPlanPriceResponse = (isSuccess) => ({
  type: Constants.REQUEST_PLAN_PRICE_RESPONSE,
  isSuccess,
});

