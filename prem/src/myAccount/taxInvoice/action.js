import * as Constants from "../../constants";

export const requestAllDetails = (invoiceId) => ({
  type: Constants.REQUEST_ALL_DETAILS_INVOICE,
  url: Constants.API_URLS.DETAIL_INVOICE_URL,
  invoiceId,
});

export const allDetailsInvoiceResponse = (
  details,
  invitees,
  invoicePeriodRequest
) => ({
  type: Constants.ALL_DETAILS_INVOICE_RESPONSE,
  details,
  invitees,
  invoicePeriodRequest,
});

export const paymentSuccess = (responces) => ({
  type: Constants.TAX_INVOICES_PAYMENT_REQUEST, //this will match with your saga
  url: Constants.API_URLS.TAX_INVOICES_PAYMENT_URL,
  responces,
});

export const responsePaymentSuccess = (paymentStaus) => ({
  type: Constants.TAX_INVOICES_PAYMENT_RESPONCES,
  paymentStaus,
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
