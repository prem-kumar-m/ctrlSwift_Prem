import * as Constants from "../constants";

export const requestAllTax = () => ({
  type: Constants.REQUEST_ALL_TAX,
  url: Constants.API_URLS.LIST_SERVICES_TAX_URL,
});

export const allTaxResponse = (Taxs) => ({
  type: Constants.ALL_TAX_RESPONSE,
  Taxs,
});
export const addTaxs = (countryName, servicesTaxPercentage, mode) => (
  // console.log("mode inside action" + mode),
  {
    type: Constants.ADD_TAXS, //this will match with your saga
    url:
      mode === "edit"
        ? Constants.API_URLS.UPDATE_TAXS_URL
        : Constants.API_URLS.ADD_TAXS_URL,
    countryName,
    servicesTaxPercentage,
    mode,
  }
);

export const addTaxsResponse = (isSuccess) => ({
  type: Constants.ADD_TAXS_RESPONSE,
  isSuccess,
});

export const reqdeleteTaxs = (country) => ({
  type: Constants.DELETE_TAXS, //this will match with your saga
  url: Constants.API_URLS.DELETE_TAXS_URL,
  country,
});

export const deleteTaxsResponse = (isSuccess) => ({
  type: Constants.DELETE_TAXS_RESPONSE_BY_COUNTRY,
  url: Constants.API_URLS.DELETE_TAXS_URL,
  isSuccess,
});
