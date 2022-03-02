import * as Constants from "../constants";

export const getPriceDetails = (data) => ({
  type: Constants.CUSTOMIZE_GET_PRICE_DETAILS, //this will match with your saga
  url: Constants.API_URLS.GET_PRICE_DETAILS_URL,
  data,
});

export const responseGetPriceDetails = (pricedetails) => ({
  type: Constants.CUSTOMIZE_GET_PRICE_DETAILS_RESPONSE,
  pricedetails,
});

export const getPriceByTerms = (data) => ({
  type: Constants.GET_PRICE_BY_TERMS, //this will match with your saga
  url: Constants.API_URLS.GET_PRICE_DETAILS_URL,
  data,
});

export const responseGetPriceByTerms = (priceByTerms) => ({
  type: Constants.GET_PRICE_BY_TERMS_RESPONSE,
  priceByTerms,
});
export const requestInr = (data) => ({
  type: Constants.REQUEST_INR, //this will match with your saga
  url: Constants.API_URLS.CURRENCY_INR_URL,
  data,
});

export const responseRequestInr = (currencyInr) => ({
  type: Constants.RESPONSE_INR,
  currencyInr,
});

export const dataCustomizePage2 = (dataCustomizePage) => ({
  type: Constants.CUSTOMEIZE_PAGE_2_DATA,
  dataCustomizePage,
});

export const insertPlan = (data) => ({
  type: Constants.INSERT_PLAN, //this will match with your saga
  url: Constants.API_URLS.INSERT_PLAN_URL,
  data,
});

export const responseInsertPlan = (insertPlanResponse) => ({
  type: Constants.RESPONCES_INSERT_PLAN,
  insertPlanResponse,
});
