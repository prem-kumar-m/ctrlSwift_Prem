import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    reports = [],
  }
) => {
  switch (type) {
    case Constants.ALL_SRN_DATA_RESPONSE: {
      const statenew = { ...state };
      statenew.reports =reports;
      return statenew;
    }

    default:
      return state;
  }
};
