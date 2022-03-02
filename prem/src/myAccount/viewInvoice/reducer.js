import * as Constants from "../../constants";
import { any } from "prop-types";
export default (
  state = {},
  {
    type,
    firstName = "",
    lastName = "",
    email = "",
    department = "",
    mobileCountryCode = "",
    mobile = "",
    landlineCountryCode = "",
    landLine = "",
    company = "",
    address = "",
    country = "",
    city = "",
    customer = [],
    download = [],
    pincode = "",
    paymentStaus = any,
    invoiceUrl = any,
    isSuccess = any,
    userlist = "",
  }
) => {
  switch (type) {
    case Constants.RESPONSE_INVOICE_URL: {
      console.log("invoiceUrl" + invoiceUrl);
      const statenew = { ...state };
      statenew.invoiceUrl = invoiceUrl;

      return statenew;
    }

    case Constants.INVOICES_PAYMENT_RESPONCES: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(paymentStaus)
      );

      const statenew = { ...state };

      statenew.paymentStaus = paymentStaus;

      return statenew;
    }

    case Constants.RECEIVE_LOAD_VIEW_INVOICE_LIST: {
      console.log(
        " RECEIVE_LOAD_USER_LIST_DATA receive data in reducer layer " +
          JSON.stringify(customer)
      );
      const statenew = { ...state };
      statenew.customer = customer;
      return statenew;
    }

    case Constants.RECEIVE_DOWNLOAD_INVOICE: {
      console.log(
        " RECEIVE_DOWNLOAD_INVOICE receive data in reducer layer " +
          JSON.stringify(download)
      );
      const statenew = { ...state };
      statenew.download = download;
      return statenew;
    }
    case Constants.DELETE_INVOICE_RESPONSE: {
      console.log(
        "Delete User Success in reducer....... " + JSON.stringify(isSuccess)
      );
      const statenew = { ...state };
      statenew.isSuccess = isSuccess;
      return statenew;
    }

    default:
      return state;
  }
};
