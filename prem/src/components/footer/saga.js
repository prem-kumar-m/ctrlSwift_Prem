import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata } from "../../apil-call";
import { Base_URL } from "../../urls";
import { errorMessages } from "../../ErrorMessage";

function* addNewsLetter(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add NEWSLETTER Post method is " +
        Base_URL +
        Constants.API_URLS.ADD_NEWSLETTER_URL
    );
    const postResponse = yield postdata(
      Base_URL + Constants.API_URLS.ADD_NEWSLETTER_URL,
      action.email
    );

    console.log("The response data is : " + JSON.stringify(postResponse));
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.addNewsLetterResponse(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addNewsLetterResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = { success: false, message: "Cannot add NewsLetter." };
    yield put(Actions.addNewsLetterResponse(errorMessage));
  }
}
export default function* newsLetterSaga() {
  yield takeLatest(Constants.ADD_NEWSLETTER, addNewsLetter);
}
