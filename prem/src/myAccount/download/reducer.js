import { any } from "prop-types";
import * as Constants from "../../constants";

export default (
  state = {},
  {
    type,
    pricedetails = any,
    updateAgreement = any,
    priceByTerms = any,
    details = [],
    invitees = [],
  }
) => {
  switch (type) {
    // case Constants. GET_PRICE_DETAILS_RESPONSE: {
    //   console.log('Add Showroom Reducer is Add Showroom Success ' + JSON.stringify(pricedetails));

    //   const statenew = {...state};

    //   statenew.pricedetails = pricedetails;

    //   return statenew;
    // }

    // case Constants. GET_PRICE_BY_TERMS_RESPONSE: {
    //   console.log('Add Showroom Reducer is Add Showroom Success ' + JSON.stringify(priceByTerms));

    //   const statenew = {...state};

    //   statenew.priceByTerms = priceByTerms;

    //   return statenew;
    // }

  /*  case Constants.RESPONCES_UPDATE_AGREEMENT: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(updateAgreement)
      );
      const statenew = { ...state };
      statenew.updateAgreement = updateAgreement;
      return statenew;
    }*/
    case Constants.ALL_DETAILS_INVOICE_RESPONSE: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(details)
      );

      const statenew = { ...state };
      statenew.invitees = invitees;
      statenew.details = details;
      return statenew;
    }

    default:
      return state;
  }
};
