// import * as Constants from "../../constants";
// import * as Actions from "./action";
// import { Base_URL } from "../../urls";
// import {put,takeLatest} from "redux-saga/effects";
// import { getSecureData } from "../../apil-call";

// function* dataSRN (action){
//     try{
//         console.log("in saga------------->");
//         const data = yield getSecureData(Base_URL+action.url);

//         yield put(Actions.dataSRNResponse(data.dataSRN));
//     }catch (e){
//         yield put(Actions.dataSRNResponse([]));
//     }
// }

// export default function* commercialSRNSaga(){
//     yield takeLatest(Constants.SRN_TABLE_DATA,dataSRN);
// }