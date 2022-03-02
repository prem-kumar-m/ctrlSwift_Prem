import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  { 
    type,
    ticketslist = [],
    count =[],
  }
) => {
  switch (type) {

    case Constants.ALL_TICKETS_RESPONSE: {
      const statenew = { ...state };
      statenew.count = count;
      statenew.ticketslist =ticketslist;
      return statenew;
    }


    default:
      return state;
  }
};
