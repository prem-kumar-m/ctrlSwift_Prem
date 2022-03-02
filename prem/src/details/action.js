import * as Constants from "../constants";

export const requestAllDetails = (ticket) => ({
  type: Constants.REQUEST_ALL_DETAILS,
  url: Constants.API_URLS.DETAIL_URL,
  ticket,
});

export const allDetailsResponse = (details, invitees) => ({
  type: Constants.ALL_DETAILS_RESPONSE,
  details,
  invitees,
});
