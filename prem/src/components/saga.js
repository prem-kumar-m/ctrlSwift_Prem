import { put, takeLatest } from "redux-saga/effects";
import * as Constants from "../../constants";
import * as Actions from "../../admin_login/action";
import { fetchdataget, getdataObject, postdata } from "../../apil-call";
import { Base_URL } from "../../urls";

function* verifyLogin(action) {
  try {
    const responseData = yield postdata(
      Base_URL + Constants.API_URLS.LOGIN_VERIFY_URL,
      {
        email: action.username,
        password: action.password,
      }
    );
    console.log("111111111" + JSON.stringify(responseData));
    yield put(Actions.verifyLoginResponse(responseData.data));
  } catch (e) {
    const errorMessage = {
      success: false,
      message: "Invalid Credentials. Plz check and try again",
    };
    yield put(Actions.verifyLoginResponse(errorMessage));
  }
}
export default function* loginSaga() {
  yield takeLatest(Constants.VERIFY_LOGIN, verifyLogin);
}
