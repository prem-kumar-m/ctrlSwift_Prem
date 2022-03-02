import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    details = [],
    invitees = [],
    requester = "",
    emailId = "",
    date = "",
    time = "",
    mobile = "",
    metal = "",
    description = "",
    productType = "",
    salesperson = "",
    showroom = "",
    itAssignee = "",
    inviteeEmailId = "",
    name = "",
    inviteeMobile = "",
    isSuccess = any,
  }
) => {
  switch (type) {
    case Constants.ALL_DETAILS_RESPONSE: {
      const statenew = { ...state };
      console.log("details" + details);

      statenew.details = details;
      return statenew;
    }

    default:
      return state;
  }
};
