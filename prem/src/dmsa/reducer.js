import { any } from "prop-types";
import * as Constants from "../constants";

export default (
  state = {},
  {
    type,
    createOrderId = any,
    updateAgreement = any,
    fileUploadresponces = any,
    paymentStaus = any,
  }
) => {
  switch (type) {
    case Constants.RESPONCES_UPDATE_AGREEMENT: {
      ////console.log( JSON.stringify(updateAgreement));
      const statenew = { ...state };
      statenew.updateAgreement = updateAgreement;
      return statenew;
    }

    case Constants.RESPONSE_FILE_UPLOAD: {
      ////console.log( JSON.stringify(fileUploadresponces));
      const statenew = { ...state };
      statenew.fileUploadresponces = fileUploadresponces;
      return statenew;
    }

    case Constants.RESPONSE_CREATE_ORDER_ID: {
      console.log(
        "Add createOrderId is Add createOrderId Success " +
          JSON.stringify(createOrderId)
      );
      const statenew = { ...state };
      statenew.createOrderId = createOrderId;
      return statenew;
    }

    case Constants.DMSA_CREATE_INVOICES_PAYMENT_RESPONCES: {
      console.log(
        "Add Showroom Reducer is Add Showroom Success " +
          JSON.stringify(paymentStaus)
      );

      const statenew = { ...state };

      statenew.paymentStaus = paymentStaus;

      return statenew;
    }

    default:
      return state;
  }
};
