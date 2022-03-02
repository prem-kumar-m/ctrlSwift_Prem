//  import * as Constants from "../../constants";
// import * as Actions from "./action";
// import { Base_URL } from "../../urls";
// import {put,takeLatest} from "redux-saga/effects";
// import { getSecureData } from "../../apil-call";

// function* dataTicket (action){
//     try{
//         console.log("in saga------------->");
//         const data = yield getSecureData(Base_URL+action.url);

//         yield put(Actions.dataTicketResponse(data.dataTicket));
//     }catch (e){
//         yield put(Actions.dataTicketResponse([]));
//     }
// }

// export default function* commercialTicketSaga(){
//     yield takeLatest(Constants.COMMERCIAL_TICKET_DATA,dataTicket);
// }