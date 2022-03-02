import { any } from "prop-types";
import * as Constants from "../constants";

export default (
  state = {},
  {
    type,
    ticket = "",
    designAndCollections = "",
    teamCoOrdinationAndSupport = "",
    overallExperience = "",
    isSuccess = any,
  }
) => {
  switch (type) {
    case Constants.ADD_FEEDBACK_RESPONSE: {
      console.log("Add Showroom Reducer is Add Showroom Success " + JSON.stringify(isSuccess));

      const statenew = { ...state };
      statenew.ticket = ticket;
      statenew.designAndCollections = designAndCollections;
      statenew.teamCoOrdinationAndSupport = teamCoOrdinationAndSupport;
      statenew.overallExperience = overallExperience;
      statenew.isSuccess = isSuccess;

      return statenew;
    }

    default:
      return state;
  }
};
