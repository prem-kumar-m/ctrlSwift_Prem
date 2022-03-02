import * as Constants from "../constants";

export const acceptedPartners = () => (
  console.log("=======in action ==========="),
  {
    type: Constants.ACCEPTED_PARTNERS,
    url: Constants.API_URLS.ACCEPTED_PARTNERS_URL,
  }
);

export const acceptedPartnersResponse = (company) => (
  console.log("=========in action response============"),
  {
    type: Constants.ACCEPTED_PARTNERS_RESPONSE,
    company,
  }
);
