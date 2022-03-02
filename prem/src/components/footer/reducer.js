import { any } from "prop-types";
import * as Constants from "../../constants";

export default (
  state = {},
  {
    type,
    ticket = "",
    designAndCollections = "",
    teamCoOrdinationAndSupport = "",
    overallExperience = "",
    isSuccess = "",
  }
) => {
  switch (type) {
    case Constants.ADD_NEWSLETTER_RESPONSE: {
      console.log("Add Showroom Reducer is Add Showroom Success " + isSuccess);

      const statenew = { ...state };
      statenew.isSuccess = isSuccess;

      return statenew;
    }

    default:
      return state;
  }
};
