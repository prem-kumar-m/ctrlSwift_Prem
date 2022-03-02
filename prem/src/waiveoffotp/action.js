import * as Constants from "../constants";

// export const callCenterLoginPageData = state => ({
//   type: Constants.CALL_CENTER_LOGIN_PAGE_DATA,
//   url: Constants.API_URLS.CALL_CENTER_LOGIN_SUCCESS_URL,
//   state,
// });

export const requestInvoiceOtp = (invoiceOtp, invoiceNumber) => ({
  type: Constants.REQUEST_INVOICE_OTP,
  url: Constants.API_URLS.VALIDATE_INVOICE_NUMBER_URL,
  invoiceOtp,
  invoiceNumber,
});

export const verifyOtpResponse = (otpSuccess) => ({
  type: Constants.RESPONSE_OTP,
  otpSuccess,
});
export const resendOtp = (invoiceNumber) => ({
  type: Constants.RESEND_WAIVEOFF_CODE,
  url: Constants.API_URLS.RESEND_WAIVEOFF_CODE_URL,
  invoiceNumber,
});

export const resendOtpResponse = (resendOtpSuccess) => ({
  type: Constants.RESEND_WAIVEOFF_CODE_RESPONSE,
  resendOtpSuccess,
});
