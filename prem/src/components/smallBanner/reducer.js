import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    isSuccess = any,
    type,
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      return statenew;
    }

    case Constants.ALL_PRICE_RESPONSE_LIST: {
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }




    default:
      return state;
  }
};
