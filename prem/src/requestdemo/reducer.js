import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    timezonelist = [],
    demoStatus = any,
    reports = [],
    users = "",
    timeslotlist = [],
  }
) => {
  switch (type) {
    case Constants.RECEIVE_LOAD_TIMEZONE_LIST_DATA: {
      console.log(
        " timezonelist receive data in reducer layer " +
          JSON.stringify(timezonelist)
      );
      const statenew = { ...state };
      statenew.timezonelist = timezonelist;
      return statenew;
    }

    case Constants.RECEIVE_LOAD_TIMESLOT_LIST_DATA: {
      console.log(
        " timeslotlist receive data in reducer layer " +
          JSON.stringify(timeslotlist)
      );
      const statenew = { ...state };
      statenew.timeslotlist = timeslotlist;
      return statenew;
    }

    case Constants.RECEIVE_DEMO: {
      console.log(
        " timeslotlist receive data in reducer layer " +
          JSON.stringify(demoStatus)
      );
      const statenew = { ...state };
      statenew.demoStatus = demoStatus;
      return statenew;
    }

    default:
      return state;
  }
};
