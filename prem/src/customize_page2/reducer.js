import { any } from "prop-types";
import * as Constants from "../constants";

export default (
  state = {},
  {
    type,
    pricedetails = any,
    currencyInr = any,
    priceByTerms = any,
    insertPlanResponse = any,
    dataCustomizePage = any,
  }
) => {
  switch (type) {
    case Constants.CUSTOMIZE_GET_PRICE_DETAILS_RESPONSE: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(pricedetails)
      );

      const statenew = { ...state };

      statenew.pricedetails = pricedetails;

      return statenew;
    }

    case Constants.GET_PRICE_BY_TERMS_RESPONSE: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(priceByTerms)
      );

      const statenew = { ...state };

      statenew.priceByTerms = priceByTerms;

      return statenew;
    }

    case Constants.RESPONSE_INR: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(currencyInr)
      );
      const statenew = { ...state };
      statenew.currencyInr = currencyInr;
      return statenew;
    }

    case Constants.CUSTOMEIZE_PAGE_2_DATA: {
      console.log("CUSTOMEIZE_PAGE_2_DATA" + JSON.stringify(dataCustomizePage));
      const statenew = { ...state };
      statenew.dataCustomizePage = dataCustomizePage;
      return statenew;
    }

    case Constants.RESPONCES_INSERT_PLAN: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(insertPlanResponse)
      );
      const statenew = { ...state };
      statenew.insertPlanResponse = insertPlanResponse;
      return statenew;
    }

    default:
      return state;
  }
};
