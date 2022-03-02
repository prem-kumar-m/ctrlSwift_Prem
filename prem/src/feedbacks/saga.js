import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../constants";
import * as Actions from "./action";
import { postdata } from "../apil-call";
import { Base_URL } from "../urls";
import { errorMessages } from "../ErrorMessage";

function* addFeedback(action) {
  try {
    console.log(JSON.stringify(action));
    console.log(
      "The URL to Add feedback Post method is " +
        Base_URL +
        Constants.API_URLS.ADD_FEEDBACK_URL
    );
    const postResponse = yield postdata(
      Base_URL + Constants.API_URLS.ADD_FEEDBACK_URL,
      {
        demoId: action.ticket,
        firstQuestion: action.Q1,
        secondQuestion: action.Q2,
        thirdQuestion: action.Q3,
        fourthQuestion: action.Q4,
        fifthQuestion: action.Q5,
      }
    );

    console.log("The response data is : " + JSON.stringify(postResponse));
    if (
      postResponse.status === 200 &&
      postResponse.data.success === true &&
      postResponse.data.success !== undefined &&
      postResponse.data.success !== null
    ) {
      yield put(Actions.addFeedbackResponse(postResponse.data));
    } else if (
      postResponse.status === 200 &&
      postResponse.data.success === false
    ) {
      const responcesMessage = errorMessages(postResponse.data.message);
      const errorMessage = { success: false, message: responcesMessage };
      yield put(Actions.addFeedbackResponse(errorMessage));
    }
  } catch (e) {
    const errorMessage = { success: false, message: "Cannot add Feedback." };
    yield put(Actions.addFeedbackResponse(errorMessage));
  }
}
export default function* feedbackSaga() {
  yield takeLatest(Constants.ADD_FEEDBACK, addFeedback);
}
