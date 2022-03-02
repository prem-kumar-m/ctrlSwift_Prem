import * as Constants from "../../constants";

export const addNewsLetter = (email) => ({
  type: Constants.ADD_NEWSLETTER, //this will match with your saga
  url: Constants.API_URLS.ADD_NEWSLETTER_URL,
  email,
});

export const addNewsLetterResponse = (isSuccess) => ({
  type: Constants.ADD_NEWSLETTER_RESPONSE,
  isSuccess,
});
