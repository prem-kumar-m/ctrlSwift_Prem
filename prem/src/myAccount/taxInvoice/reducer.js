import { any } from "prop-types";
import * as Constants from "../../constants";

export default (
  state = {},
  {
    type,
    pricedetails = any,
    updateAgreement = any,
    paymentStaus = any,
    details = [],
    invitees = [],
    invoicePeriodRequest = [],
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

    case Constants.TAX_INVOICES_PAYMENT_RESPONCES: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(paymentStaus)
      );

      const statenew = { ...state };

      statenew.paymentStaus = paymentStaus;

      return statenew;
    }

    case Constants.ALL_DETAILS_INVOICE_RESPONSE: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(details)
      );
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(invitees)
      );
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(invoicePeriodRequest)
      );

      const statenew = { ...state };
      statenew.invitees = invitees;
      statenew.details = details;
      statenew.invoicePeriodRequest = invoicePeriodRequest;

      return statenew;
    }

    default:
      return state;
  }
};
