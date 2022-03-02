import * as Constants from "../../constants";


export const SRNRequest = () => (
  console.log("testing"),
  {
    type: Constants.REQUEST_ALL_SRN_REPORTS,
    url: Constants.API_URLS.LIST_REPORTS_URL,
  }
);

export const SRNResponse = (reports) => ({
  type: Constants.ALL_SRN_DATA_RESPONSE,
  reports,
});


