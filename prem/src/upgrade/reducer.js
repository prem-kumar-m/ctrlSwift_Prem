import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    timezonelist = [],
    timeSlotLite = any,
    demoStatus = any,
    reports = [],
    recivedcheckStatus = "",
    timeslotlist = [],
    liteRecommended = any,
    enterpriseRecommended = any,
    automatedTime = [],
    automatedTimePremium = [],
    automatedTimeEnterprise = [],
    dataCustomizePage1 = any,
    recommendedPrice = any,
    detailslist = "",
    premiumRecommended = any,
  }
) => {
  switch (type) {
    case Constants.UPGRADE_RECEIVE_LOAD_TIMEZONE_LIST_DATA: {
      //console.log(" timezonelist receive data in reducer layer " + JSON.stringify(timezonelist));
      const statenew = { ...state };
      statenew.timezonelist = timezonelist;
      return statenew;
    }

    case Constants.RECEIVE_LITE_CALCULATE_PRICE: {
      console.log(
        " liteRecommended receive data in reducer layer " +
          JSON.stringify(liteRecommended)
      );
      const statenew = { ...state };
      statenew.liteRecommended = liteRecommended;
      return statenew;
    }

    case Constants.RECEIVE_FINAL_CALCULATE_PRICE: {
      console.log(
        " recommendedPrice receive data in reducer layer " +
          JSON.stringify(recommendedPrice)
      );
      const statenew = { ...state };
      statenew.recommendedPrice = recommendedPrice;
      return statenew;
    }

    case Constants.RECEIVE_CHECKSTATUS: {
      console.log(
        " recivedcheckStatus reducer layer " +
          JSON.stringify(recivedcheckStatus)
      );
      const statenew = { ...state };
      statenew.recivedcheckStatus = recivedcheckStatus;
      return statenew;
    }

    case Constants.RECEIVE_ENTERPRISE_CALCULATE_PRICE: {
      console.log(
        " enterpriseRecommended receive data in reducer layer " +
          JSON.stringify(enterpriseRecommended)
      );
      const statenew = { ...state };
      statenew.enterpriseRecommended = enterpriseRecommended;
      return statenew;
    }

    case Constants.RECEIVE_PREMIUM_CALCULATE_PRICE: {
      console.log(
        " premiumRecommended receive data in reducer layer " +
          JSON.stringify(premiumRecommended)
      );
      const statenew = { ...state };
      statenew.premiumRecommended = premiumRecommended;
      return statenew;
    }

    case Constants.RECEIVE_LITE_TIME: {
      // console.log(" timeslotlist receive data in reducer layer " + JSON.stringify(timeSlotLite));
      const statenew = { ...state };
      statenew.timeSlotLite = timeSlotLite;
      return statenew;
    }
    case Constants.RECEIVE_LITE_AUTOMATED_TIME: {
      console.log(
        " timeslotlist receive data in reducer layer " +
          JSON.stringify(automatedTime)
      );
      const statenew = { ...state };
      statenew.automatedTime = automatedTime;
      return statenew;
    }

    case Constants.RECEIVE_ENTERPRISE_AUTOMATED_TIME: {
      console.log(
        " timeslotlist receive data in reducer layer " +
          JSON.stringify(automatedTimeEnterprise)
      );
      const statenew = { ...state };
      statenew.automatedTimeEnterprise = automatedTimeEnterprise;
      return statenew;
    }

    case Constants.RECEIVE_PREMIUM_AUTOMATED_TIME: {
      console.log(
        " timeslotlist receive data in reducer layer " +
          JSON.stringify(automatedTimePremium)
      );
      const statenew = { ...state };
      statenew.automatedTimePremium = automatedTimePremium;
      return statenew;
    }

    case Constants.CUSTOMEIZE_PAGE_1_DATA: {
      console.log(
        "CUSTOMEIZE_PAGE_2_DATA" + JSON.stringify(dataCustomizePage1)
      );
      const statenew = { ...state };
      statenew.dataCustomizePage1 = dataCustomizePage1;
      return statenew;
    }
    case Constants.RECEIVE_LOAD_DETAILS_LIST_DATA: {
      console.log(
        " RECEIVE_LOAD_USER_LIST_DATA receive data in reducer layer " +
          JSON.stringify(detailslist)
      );
      const statenew = { ...state };
      statenew.detailslist = detailslist;
      return statenew;
    }

    default:
      return state;
  }
};
