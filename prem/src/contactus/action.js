import * as Constants from "../constants";

export const requestContactUs = (ticket) => ({
  type: Constants.REQUEST_CONTACT_US,
  url: Constants.API_URLS.CONTACT_US_URL,
  ticket,
});

export const responseContactUs = (isSuccess) => ({
  type: Constants.RESPONSE_CONTACT_US,
  isSuccess,
});
