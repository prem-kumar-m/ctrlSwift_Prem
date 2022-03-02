import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "./action";
import { postdata } from "../../apil-call";
import { Base_URL } from "../../urls";

function* newPassword(action) {
  console.log(Base_URL + Constants.API_URLS.RESETPASSWORD_URL, {
    email: action.email,
    newPassword: action.newpassword,
  });
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.RESETPASSWORD_URL,
      {
        email: action.email,
        newPassword: action.newpassword,
      }
    );
    console.log("responseData" + JSON.stringify(responseData));
    if (responseData.status === 200) {
      yield put(Actions.newPasswordResponse(responseData.data));
    } else {
      const errorMessage = {
        success: false,
        message: "Could not reset the password, please try again",
      };
      yield put(Actions.newPasswordResponse(responseData));
    }
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Could not reset the password, please try again",
    };
    yield put(Actions.newPasswordResponse(errorMessage));
  }
}
export default function* resetSaga() {
  yield takeLatest(Constants.RESETPASSWORD_DATA, newPassword);
}
