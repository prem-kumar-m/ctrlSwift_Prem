import * as Constants from "../constants";
import { any } from "prop-types";
export default (state = {}, { isDetailsSuccess = any, type }) => {
  switch (type) {
    case Constants.RECEIVE_INQUIRY_LIST: {
      console.log(
        "========in reducer=======" + JSON.stringify(isDetailsSuccess)
      );
      const statenew = { ...state };
      statenew.isDetailsSuccess = isDetailsSuccess;

      return statenew;
    }
    default:
      return state;
  }
};
