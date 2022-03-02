import { actionChannel } from "redux-saga/effects";
import * as Constants from "../../constants";
import { stateValidator } from "../../Core/utils";

export const requestviewInvoiceList = () => ({
  type: Constants.REQUEST_LOAD_VIEW_INVOICE_LIST,
  url: Constants.API_URLS.VIEW_INVOICE_LIST_URL,
});

export const receiveloadviewInvoiceList = (customer) => ({
  type: Constants.RECEIVE_LOAD_VIEW_INVOICE_LIST,
  customer,
});

export const downloadInvoice = () => ({
  type: Constants.DOWNLOAD_INVOICE,
  url: Constants.API_URLS.DOWNLOAD_URL,
});

export const receivedownloadInvoice = (download) => ({
  type: Constants.RECEIVE_DOWNLOAD_INVOICE,
  download,
});

export const deleteInvoice = (invoiceNumber) => ({
  type: Constants.DELETE_INVOICE, //this will match with your saga
  url: Constants.API_URLS.DELETE_INVOICE_URL,
  invoiceNumber,
});

export const deleteInvoiceResponse = (isSuccess) => ({
  type: Constants.DELETE_INVOICE_RESPONSE,
  isSuccess,
});

export const requestInVoice = (invoiceId) => ({
  type: Constants.REQUEST_INVOICE_URL,
  url: Constants.API_URLS.INVOICE_URL,
  invoiceId,
});

export const resposeInVoice = (invoiceUrl) => ({
  type: Constants.RESPONSE_INVOICE_URL,
  invoiceUrl,
});

export const paymentSuccess = (responces) => ({
  type: Constants.INVOICES_PAYMENT_REQUEST, //this will match with your saga
  url: Constants.API_URLS.INVOICES_PAYMENT_URL,
  responces,
});

export const responsePaymentSuccess = (paymentStaus) => ({
  type: Constants.INVOICES_PAYMENT_RESPONCES,
  paymentStaus,
});
