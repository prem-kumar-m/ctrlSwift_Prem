import * as Constants from "../constants";

export const agreementUpdate = (data) => ({
  type: Constants.UPDATE_AGREEMENT, //this will match with your saga
  url: Constants.API_URLS.DMAS_AGREEMENT_URL,
  data,
});

export const responseAgreementUpdate = (updateAgreement) => ({
  type: Constants.RESPONCES_UPDATE_AGREEMENT,
  updateAgreement,
});

export const fileUpload = (data) => ({
  type: Constants.REQUEST_FILE_UPLOAD, //this will match with your saga
  url: Constants.API_URLS.FILE_UPLOAD_URL,
  data,
});

export const responseFileUpload = (fileUploadresponces) => ({
  type: Constants.RESPONSE_FILE_UPLOAD,
  fileUploadresponces,
});

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

export const createOrderData = (data) => ({
  type: Constants.CREATE_ORDER_ID, //this will match with your saga
  url: Constants.API_URLS.CREATE_ORDER_ID,
  data,
});

export const responseCreateOrderData = (createOrderId) => ({
  type: Constants.RESPONSE_CREATE_ORDER_ID,
  createOrderId,
});

export const paymentSuccess = (responces) => ({
  type: Constants.DMSA_CREATE_INVOICES_PAYMENT_REQUEST, //this will match with your saga
  url: Constants.API_URLS.CREATE_INVOICES_PAYMENT_URL,
  responces,
});

export const responsePaymentSuccess = (paymentStaus) => ({
  type: Constants.DMSA_CREATE_INVOICES_PAYMENT_RESPONCES,
  paymentStaus,
});
