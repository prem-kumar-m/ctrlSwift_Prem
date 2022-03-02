import * as Constants from "../constants";

export const requestloadtimezone = (timezone) => ({
  type: Constants.CUSTOMIZE_REQUEST_LOAD_TIMEZONE_LIST_DATA,
  url: Constants.API_URLS.CUSTOMIZE_LIST_TIMEZONE_URL,
  timezone,
});

export const receiveloadtimezonelist = (timezonelist) => ({
  type: Constants.CUSTOMIZE_RECEIVE_LOAD_TIMEZONE_LIST_DATA,
  timezonelist,
});

export const requestLiteClaculatePrice = (data) => ({
  type: Constants.REQUEST_LITE_CALCULATE_PRICE,
  url: Constants.API_URLS.LITE_CALCULATE_PRICE_URL,
  data,
});

export const responcesLiteClaculatePrice = (liteRecommended) => ({
  type: Constants.RECEIVE_LITE_CALCULATE_PRICE,
  liteRecommended,
});

export const litetimeslot = (liteTimeZone) => ({
  type: Constants.REQUEST_LITE_TIME,
  url: Constants.API_URLS.LITE_TIME_SLOT_URL,
  liteTimeZone,
});

export const responceslitetime = (timeSlotLite) => ({
  type: Constants.RECEIVE_LITE_TIME,
  timeSlotLite,
});
export const automatedEndTime = (
  liteTimeZone,
  liteserviceSupport,
  liteStartTime
) => ({
  type: Constants.REQUEST_AUTOMATED_TIME,
  url: Constants.API_URLS.LITE_AUTOMATED_TIME_URL,
  liteTimeZone,
  liteserviceSupport,
  liteStartTime,
});

export const responcesautomatedtime = (automatedTime) => ({
  type: Constants.RECEIVE_LITE_AUTOMATED_TIME,
  automatedTime,
});

export const automatedEndTimeEnterprise = (
  enterpriseTimeZone,
  enterpriseserviceSupport,
  enterpriseStartTime
) => ({
  type: Constants.REQUEST_AUTOMATED_TIME_ENTERPRISE,
  url: Constants.API_URLS.LITE_AUTOMATED_TIME_ENTERPRISE_URL,
  enterpriseTimeZone,
  enterpriseserviceSupport,
  enterpriseStartTime,
});

export const responcesautomatedtimeenterprise = (automatedTimeEnterprise) => ({
  type: Constants.RECEIVE_ENTERPRISE_AUTOMATED_TIME,
  automatedTimeEnterprise,
});
export const automatedEndTimePremium = (
  premiumTimezone,
  premiumserviceSupport,
  premiumStartTime
) => ({
  type: Constants.REQUEST_AUTOMATED_TIME_PREMIUM,
  url: Constants.API_URLS.LITE_AUTOMATED_TIME_PREMIUM_URL,
  premiumTimezone,
  premiumserviceSupport,
  premiumStartTime,
});

export const responcesautomatedtimepremium = (automatedTimePremium) => ({
  type: Constants.RECEIVE_PREMIUM_AUTOMATED_TIME,
  automatedTimePremium,
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

export const requestEnterpriseClaculatePrice = (data) => ({
  type: Constants.REQUEST_ENTERPRISE_CALCULATE_PRICE,
  url: Constants.API_URLS.ENTERPRISE_CALCULATE_PRICE_URL,
  data,
});

export const responcesEnterpriseClaculatePrice = (enterpriseRecommended) => ({
  type: Constants.RECEIVE_ENTERPRISE_CALCULATE_PRICE,
  enterpriseRecommended,
});

export const requestPremiumClaculatePrice = (data) => ({
  type: Constants.REQUEST_PREMIUM_CALCULATE_PRICE,
  url: Constants.API_URLS.PREMIUM_CALCULATE_PRICE_URL,
  data,
});

export const responcesPremiumClaculatePrice = (premiumRecommended) => ({
  type: Constants.RECEIVE_PREMIUM_CALCULATE_PRICE,
  premiumRecommended,
});

export const requestClaculatePrice = (data) => ({
  type: Constants.CUSTOMIZE_REQUEST_FINAL_CALCULATE_PRICE,
  url: Constants.API_URLS.CALCULATE_PRICE_URL,
  data,
});

export const responcesClaculatePrice = (recommendedPrice) => ({
  type: Constants.CUSTOMIZE_RECEIVE_FINAL_CALCULATE_PRICE,
  recommendedPrice,
});

export const dataCustomizePage1 = (dataCustomizePage1) => ({
  type: Constants.CUSTOMEIZE_PAGE_1_DATA,
  dataCustomizePage1,
});
// export const requestloaddetails = (email) => (
//   console.log("email" + email),
//   {
//     type: Constants.REQUEST_LOAD_DETAILS_LIST_DATA,
//     url: Constants.API_URLS.LIST_DETAIL_URL,
//     email,
//   }
// );

// export const receiveloaddetails = (detailslist) => ({
//   type: Constants.RECEIVE_LOAD_DETAILS_LIST_DATA,
//   detailslist,
// });
