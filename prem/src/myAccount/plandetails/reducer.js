import * as Constants from "../../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    planList = "",
    contractDuration = "",
    email = "",
    department = "",
    mobileCountryCode = "",
    mobile = "",
    landlineCountryCode = "",
    landLine = "",
    reason = "",
    isSuccess = "",
    NoticePeriod = "",
    choosePlans = "",
    user = [],
    choosePlans2 = "",
    isSuccess2 = "",
    citylist = [],
    plandetails = any,
    userlist = "",
  }
) => {
  switch (type) {
    case Constants.RESPONCES_PLAN_DETAILS: {
      console.log(
        " RECEIVE_PLAN_DETAILS receive data in reducer layer " +
          JSON.stringify(plandetails)
      );
      const statenew = { ...state };
      statenew.plandetails = plandetails;
      return statenew;
    }

    case Constants.RECEIVE_LOAD_COSTOMERID_LIST: {
      console.log(
        " RECEIVE_LOAD_USER_LIST_DATA receive data in reducer layer " +
          JSON.stringify(user)
      );
      const statenew = { ...state };
      statenew.user = user;
      return statenew;
    }

    case Constants.RECEIVE_LOAD_DISTRICT_DATA: {
      const statenew = { ...state };
      statenew.email = email;
      statenew.planList = planList;
      statenew.contractDuration = contractDuration;
      statenew.reason = reason;

      return statenew;
    }
    case Constants.CONTRACT_UPDATE_RESPONSE: {
      const statenew = { ...state };
      statenew.isSuccess2 = isSuccess2;
      return statenew;
    }
    case Constants.CONTRACT_TERMINATE_RESPONSE: {
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

    case Constants.RECEIVE_CHECK_NOTICE_PERIOD: {
      console.log(" NoticePeriod \n" + JSON.stringify(NoticePeriod));

      const statenew = { ...state };
      statenew.NoticePeriod = NoticePeriod;
      return statenew;
    }

    case Constants.RECEIVE_LOAD_CHOOSEPLANS_LIST: {
      console.log(
        " RECEIVE_LOAD_CHOOSEPLANS_LIST receive data in reducer layer " +
          JSON.stringify(choosePlans)
      );
      const statenew = { ...state };
      statenew.choosePlans = choosePlans;
      return statenew;
    }

    case Constants.RECEIVE_LOAD_CHOOSEPLANS_LIST_EXTEND: {
      console.log(
        " RECEIVE_LOAD_CHOOSEPLANS_LIST receive data in reducer layer " +
          JSON.stringify(choosePlans2)
      );
      const statenew = { ...state };
      statenew.choosePlans2 = choosePlans2;
      return statenew;
    }

    default:
      return state;
  }
};
