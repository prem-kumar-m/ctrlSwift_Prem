import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { getSecureData, postSecureObject } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

// function* requestPlanPrice(action) {
//   //try {
//     const dataori = yield getSecureData(
//       Base_URL + action.url,
//       JSON.stringify({
//         plan: action.plan,
//         paymentTerms: action.paymentTerms,
//        // toggle: action.toggle,
//       })
//       // "Bearer ".concat(
//       //   window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
//       // )
//     );
//     put(Actions.allTaxResponse(dataori.countryTaxRes));
//   //} 
// }

function* requestPlanPrice(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + action.url,
      {
        plan: action.plan,
        paymentTerms: action.paymentTerms,
       // toggle: action.toggle,
      }
      // "Bearer ".concat(
      //   window.sessionStorage.getItem(Constants.ADMIN_ACCESS_TOKEN)
      // )
    );
    if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.requestPlanPriceResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log(responseData.data.message);
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.requestPlanPriceResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to Add User, please check your internet connection",
    };
    yield put(Actions.requestPlanPriceResponse(errorMessage));
  }
}



export default function* ctrlSwiftLiteSaga() {
  // yield takeLatest(Constants.REQUEST_ALL_TAX, requestAllTax);
  // yield takeLatest(Constants.ADD_TAXS, addTaxs);
  // yield takeLatest(Constants.DELETE_TAXS, reqdeleteTaxs);
  yield takeLatest(Constants.REQUEST_DYNAMIC_PRICE_FOR_PLAN,requestPlanPrice);

  console.log("Requesting from Users List saga");
}
