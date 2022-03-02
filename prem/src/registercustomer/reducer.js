import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    reglist = [],
    listshowroom = [],
    showroom = "",
    salespersonlist = [],
    itassigneelist = [],
    planDetials = [],
    planList = any,
    isAssignRequestSuccess,
    availableslots,
    isRescheduleRequestSuccess,
    isCancellationSuccess,
    isCompletionSuccess,
    loadplan,
  }
) => {
  switch (type) {
    case Constants.REC_LOAD_REG_USER_DATA: {
      const statenew = { ...state };
      //console.log("requestlist for the testing"+JSON.stringfy(reglist));
      statenew.reglist = reglist;
      return statenew;
      //return requestlist;
    }
    case Constants.REC_LOAD_SHOWROOM_DATA: {
      //console.log(" REC_LOAD_SHOWROOM_DATA receive data in reducer layer " + JSON.stringify(listshowroom));
      const statenew = { ...state };
      statenew.listshowroom = listshowroom;
      return statenew;
    }
    case Constants.REC_LOAD_SALESPERSON_LIST_DATA: {
      //console.log(" REC_LOAD_SALESPERSON_LIST_DATA in Call Center Assign reducer layer " + JSON.stringify(salespersonlist));
      const statenew = { ...state };
      statenew.salespersonlist = salespersonlist;
      return statenew;
    }

    case Constants.REC_LOAD_ITASSIGNEE_LIST_DATA: {
      //console.log(" REC_LOAD_ITASSIGNEE_LIST_DATA in Call Center Assign reducer layer " + JSON.stringify(itassigneelist));
      const statenew = { ...state };
      statenew.itassigneelist = itassigneelist;
      return statenew;
    }

    case Constants.REC_LOAD_SALESPERSON_BY_SHOWROOM: {
      //console.log(" REC_LOAD_SALESPERSON_BY_SHOWROOM in Call Center Assign reducer layer " + JSON.stringify(salespersonlist));
      const statenew = { ...state };
      statenew.salespersonlist = salespersonlist;
      return statenew;
    }

    case Constants.REC_SAVE_ASSIGN_REQUEST: {
      //console.log(" REC_SAVE_ASSIGN_REQUEST in Call Center Assign reducer layer " + JSON.stringify(isAssignRequestSuccess));
      const statenew = { ...state };
      statenew.isAssignRequestSuccess = isAssignRequestSuccess;
      return statenew;
    }
    case Constants.REC_AVAILABLE_SLOTS: {
      //console.log(" REC_AVAILABLE_SLOTS in Call Center Assign reducer layer " + JSON.stringify(availableslots));
      const statenew = { ...state };
      statenew.availableslots = availableslots;
      return statenew;
    }
    case Constants.REC_SAVE_RESCHEDULE_REQUEST: {
      //console.log(" REC_SAVE_RESCHEDULE_REQUEST in Call Center Assign reducer layer " + JSON.stringify(isRescheduleRequestSuccess));
      const statenew = { ...state };
      statenew.isRescheduleRequestSuccess = isRescheduleRequestSuccess;
      return statenew;
    }
    case Constants.REC_CANCELLATION_REQUEST: {
      console.log(
        " REC_CANCELLATION_REQUEST in Call Center Assign reducer layer " +
          JSON.stringify(isCancellationSuccess)
      );
      const statenew = { ...state };
      statenew.isCancellationSuccess = isCancellationSuccess;
      return statenew;
    }
    case Constants.REC_COMPLETION_REQUEST: {
      console.log(
        " REC_COMPLETION_REQUEST in Call Center Assign reducer layer " +
          JSON.stringify(isCompletionSuccess)
      );
      const statenew = { ...state };
      statenew.isCompletionSuccess = isCompletionSuccess;
      return statenew;
    }

    case Constants.RECEIVE_LOAD_ADMIN_PLAN_DETAILS:{
      const statenew ={...state};
      // console.log("reduser data: "+JSON.stringify(loadplan));
      statenew.loadplan = loadplan;
      return statenew;
    }
    case Constants.PLAN_DETAILS_RESPONCES: {
      console.log(" planDetials in reducer layer " + JSON.stringify(planList));
      const statenew = { ...state };
      statenew.planList = planList;
      return statenew;
    }

    default:
      return state;
  }
};
