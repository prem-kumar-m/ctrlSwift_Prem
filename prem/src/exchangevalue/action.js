import * as Constants from "../constants";

export const requestAllRate = () => ({
  type: Constants.REQUEST_ALL_RATE,
  url: Constants.API_URLS.LIST_EXCHANGE_RATE_URL,
});

export const allRateResponse = (Rate) => ({
  type: Constants.ALL_RATE_RESPONSE,
  Rate,
});
export const addRate = (currencyCode, exchangeRate, mode) => (
  // console.log("mode inside action" + mode),
  {
    type: Constants.ADD_RATE, //this will match with your saga
    url: mode === "edit" ? Constants.API_URLS.ADD_RATE_URL : null,
    currencyCode,
    exchangeRate,
    mode,
  }
);

export const addRateResponse = (isSuccess) => ({
  type: Constants.ADD_RATE_RESPONSE,
  isSuccess,
});
