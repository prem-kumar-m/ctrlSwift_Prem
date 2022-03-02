import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postdata , postSecureObject} from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* verifyCredential(action) {
  console.log("action-----------" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.SALES_LOGIN_VERIFY_URL,
      {
        email: action.email,
        password: action.password,
      }
    );
    console.log("responseData-----------" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyCredentialResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      const responcesMessage = errorMessages(responseData.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.verifyCredentialResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };
    yield put(Actions.verifyCredentialResponse(errorMessage));
  }
}

function* reqClearAccessTokens(action) {
  try {
    const responseData = yield postSecureObject(
      Base_URL + Constants.API_URLS.REQ_CLEAR_TOKENS_URL,
      {
        token: action.token,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.recClearAccessTokens(responseData.data));
    } else {
      const errorMessage = {
        success: false,
        message: "Clearing Access Tokens is unsuccessful.",
      };
      yield put(Actions.recClearAccessTokens(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Unable to get your request, please try again",
    };
    yield put(Actions.recClearAccessTokens(errorMessage));
  }
}

export default function* salesAdminLoginSaga() {
  yield takeLatest(Constants.REQ_CLEAR_ACCESS_TOKENS, reqClearAccessTokens);
  yield takeLatest(Constants.VERIFY_CREDENTIAL, verifyCredential);
}
