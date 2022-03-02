import * as Constants from "../constants";

export const requestAllPlanNoticePeriod = () => ({
  type: Constants.REQUEST_ALL_NOTICE_PERIOD,
  url: Constants.API_URLS.LIST_NOTICE_PERIOD_URL,
});

export const allPlanNoticePeriodResponse = (noticePeriodList) => ({
  type: Constants.ALL_NOTICE_PERIOD_RESPONSE,
  noticePeriodList,
});
export const submitAddNoticePeriod = (
  modelName,
  noticePeriodDays,
  mode,
  id
) => (
  console.log("mode inside action" + mode),
  {
    type: Constants.UPDATE_NOTICE_PERIOD, //this will match with your saga
    url:
      mode === "edit"
        ? Constants.API_URLS.UPDATE_NOTICE_PERIOD_URL
        : Constants.API_URLS.ADD_NOTICE_PERIOD_URL,
    modelName,
    noticePeriodDays,
    mode,
    id,
  }
);

export const addNoticePeriodResponse = (isSuccess) => ({
  type: Constants.UPDATE_NOTICE_PERIOD_RESPONSE,
  isSuccess,
});

export const reqdeleteNoticePeriod = (country) => ({
  type: Constants.DELETE_NOTICE_PERIOD, //this will match with your saga
  url: Constants.API_URLS.DELETE_NOTICE_PERIOD_URL,
  country,
});

export const deleteNoticePeriodResponse = (isSuccess) => ({
  type: Constants.DELETE_NOTICE_PERIOD_RESPONSE,
  url: Constants.API_URLS.DELETE_TAXS_URL,
  isSuccess,
});
