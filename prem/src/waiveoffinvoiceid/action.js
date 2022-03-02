import * as Constants from "../constants";

// export const callCenterLoginPageData = state => ({
//   type: Constants.CALL_CENTER_LOGIN_PAGE_DATA,
//   url: Constants.API_URLS.CALL_CENTER_LOGIN_SUCCESS_URL,
//   state,
// });

export const requestInvoiceNumber = (invoiceNumber) => ({
  type: Constants.REQUEST_INVOICE_NUMBER,
  url: Constants.API_URLS.INVOICE_NUMBER_URL,
  invoiceNumber,
});
export const verifyInvoiceNumber = (invoiceSuccess) => ({
  type: Constants.RESPONSE_INVOICE,
  invoiceSuccess,
});
