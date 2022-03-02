import { any } from "prop-types";
import * as Constants from "../constants";
import { upgradePlanResponse } from "./action";

export default (
  state = {},
  {
    type,
    pricedetails = any,
    createOrderIdTer = any,
    paymentStausTer = any,
    currencyInr = any,
    priceByTerms = any,
    insertPlanResponse = any,
    upgradeResponse = any,
    insertResponse = any,
    dataCustomizePage = any,
  }
) => {
  switch (type) {
    //     case Constants. GET_PRICE_DETAILS_RESPONSE: {
    //       console.log('Add Showroom Reducer is Add Showroom Success ' + JSON.stringify(pricedetails));

    //       const statenew = {...state};

    //       statenew.pricedetails = pricedetails;

    //       return statenew;
    //     }

    //     case Constants. GET_PRICE_BY_TERMS_RESPONSE: {
    //       console.log('Add Showroom Reducer is Add Showroom Success ' + JSON.stringify(priceByTerms));

    //       const statenew = {...state};

    //       statenew.priceByTerms = priceByTerms;

    //       return statenew;
    //     }

    //     case Constants. RESPONSE_INR: {
    //       console.log('Add Showroom Reducer is Add Showroom Success ' + JSON.stringify(currencyInr));
    //       const statenew = {...state};
    //       statenew.currencyInr = currencyInr;
    //       return statenew;
    //     }

    //     case Constants. CUSTOMEIZE_PAGE_2_DATA: {
    //       console.log('CUSTOMEIZE_PAGE_2_DATA' + JSON.stringify(dataCustomizePage));
    //       const statenew = {...state};
    //       statenew.dataCustomizePage = dataCustomizePage;
    //       return statenew;
    //     }

    //     case Constants. RESPONCES_INSERT_PLAN: {
    //       console.log('Add Showroom Reducer is Add Showroom Success ' + JSON.stringify(insertPlanResponse));
    //       const statenew = {...state};
    //       statenew.insertPlanResponse = insertPlanResponse;
    //       return statenew;
    //     }

    //     case Constants.UPGRADE_PLAN_RESPONSE: {
    //       console.log('Add Showroom Reducer is Add Showroom Success ' + JSON.stringify(upgradeResponse));

    //       const statenew = {...state};
    //       statenew.upgradeResponse = upgradeResponse;
    //       return statenew;
    //   }

    //   case Constants.INSERT_DATA_RESPONSE: {
    //     console.log('Add Showroom Reducer is Add Showroom Success ' + JSON.stringify(insertResponse));

    //     const statenew = {...state};
    //     statenew.insertResponse = insertResponse;
    //     return statenew;
    // }
    case Constants.RESPONSE_CREATE_ORDER_ID_TER: {
      console.log(
        "Add createOrderId is Add createOrderId Success " +
          JSON.stringify(createOrderIdTer)
      );
      const statenew = { ...state };
      statenew.createOrderIdTer = createOrderIdTer;
      return statenew;
    }
    case Constants.CREATE_INVOICES_PAYMENT_TERMINATION_RESPONCES: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(paymentStausTer)
      );

      const statenew = { ...state };

      statenew.paymentStausTer = paymentStausTer;

      return statenew;
    }

    default:
      return state;
  }
};
