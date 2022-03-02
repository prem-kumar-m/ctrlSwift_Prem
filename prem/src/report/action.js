import * as Constants from "../constants";


export const requestAllReports = () => (
  console.log("testing"),
  {
    type: Constants.REQUEST_ALL_REPORTS,
    url: Constants.API_URLS.LIST_REPORTS_URL,
  }
);

export const allReportsResponse = (reports) => ({
  type: Constants.ALL_REPORTS_RESPONSE,
  reports,
});


