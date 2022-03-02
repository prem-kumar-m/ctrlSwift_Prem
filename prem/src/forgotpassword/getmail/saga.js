import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* verifyEmail(action) {
  console.log("action" + JSON.stringify(action));
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.FORGOTPASSWORD_URL,
      {
        email: action.email,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (
      responseData.status === 200 &&
      responseData.data.success !== "undefined" &&
      responseData.data.success === true
    ) {
      yield put(Actions.verifyEmailResponse(responseData.data));
    } else if (
      responseData.data.success !== "undefined" &&
      responseData.data.success === false
    ) {
      console.log("error message testing");
      const errorMessage = errorMessages(responseData.data.message);
      console.log("error message testing", JSON.stringify(errorMessage));
      yield put(Actions.verifyEmailResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Technical issues, Please try again",
    };
    yield put(Actions.verifyEmailResponse(errorMessage));
  }
}
export default function* getmailSaga() {
  yield takeLatest(Constants.FORGOTPASSWORD_DATA, verifyEmail);
}
