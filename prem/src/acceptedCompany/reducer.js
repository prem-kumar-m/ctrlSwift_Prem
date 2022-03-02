import * as Constants from "../constants";
import { any } from "prop-types";
export default (state = {}, { company, address, type }) => {
  switch (type) {
    case Constants.ACCEPTED_PARTNERS_RESPONSE: {
      console.log("========in reducer=======");
      const statenew = { ...state };
      statenew.company = company;
      statenew.address = address;
      return statenew;
    }
    default:
      return state;
  }
};
