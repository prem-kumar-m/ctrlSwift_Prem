import * as Constants from "../../constants";

// export const agreementUpdate = (data) => ({
//   type: Constants.UPDATE_AGREEMENT, //this will match with your saga
//   url: Constants.API_URLS.DMAS_AGREEMENT_URL,
//   data,
// });

// export const responseAgreementUpdate = (updateAgreement) => ({
//   type: Constants.RESPONCES_UPDATE_AGREEMENT,
//   updateAgreement,
// });
export const requestAllDetails = (invoiceNumber) => (
  console.log("mode inside action" + invoiceNumber),
  {
    type: Constants.REQUEST_ALL_DETAILS_INVOICE,
    url: Constants.API_URLS.DETAIL_INVOICE_URL,
    invoiceNumber,
  }
);

export const allDetailsInvoiceResponse = (details, invitees) => ({
  type: Constants.ALL_DETAILS_INVOICE_RESPONSE,
  details,
  invitees,
});

// export const getPriceByTerms = (data) => ({
//     type: Constants.GET_PRICE_BY_TERMS,       //this will match with your saga
//     url: Constants.API_URLS.GET_PRICE_DETAILS_URL,
//     data
// });

// export const responseGetPriceByTerms = priceByTerms => ( {
//         type: Constants.GET_PRICE_BY_TERMS_RESPONSE,
//         priceByTerms,
//     }
// );
// export const requestInr = (data) => ({
//     type: Constants.REQUEST_INR,       //this will match with your saga
//     url: Constants.API_URLS.CURRENCY_INR_URL,
//     data
// });

// export const responseRequestInr = currencyInr => ( {
//         type: Constants.RESPONSE_INR,
//         currencyInr,
//     }
// );
