import * as Constants from "../constants";

export const reqloadrequests = (state) => ({
  type: Constants.REQ_LOAD_REQUEST_DATA,
  url: Constants.API_URLS.LOAD_REQUEST_URL,
  state,
});

export const recloadrequests = (requestlist) => ({
  type: Constants.REC_LOAD_REQUEST_DATA,
  requestlist,
});
export const reqloadshowroom = (showroom) => ({
  type: Constants.REQ_LOAD_SHOWROOM_DATA,
  url: Constants.API_URLS.LIST_SHOWROOM_URL,
  showroom,
});

export const recloadshowroom = (listshowroom) => ({
  type: Constants.REC_LOAD_SHOWROOM_DATA,
  listshowroom,
});
export const reqloadsalespersonlist = (state) => ({
  type: Constants.REQ_LOAD_SALESPERSON_LIST_DATA,
  loadsalesurl: Constants.API_URLS.LIST_SALESPERSON_URL,
  state,
});

export const recloadsalespersonlist = (salespersonlist) => ({
  type: Constants.REC_LOAD_SALESPERSON_LIST_DATA,
  salespersonlist,
});

export const reqloaditassigneelist = (state) => ({
  type: Constants.REQ_LOAD_ITASSIGNEE_LIST_DATA,
  loaditassigneeurl: Constants.API_URLS.LIST_ITASSIGNEE_URL,
  state,
});

export const recloaditassigneelist = (itassigneelist) => ({
  type: Constants.REC_LOAD_ITASSIGNEE_LIST_DATA,
  itassigneelist,
});

export const reqsalesbyshowroom = (showroom) => ({
  type: Constants.REQ_LOAD_SALESPERSON_BY_SHOWROOM,
  getbyshowroomurl: Constants.API_URLS.LOAD_SALESPERSON_BY_SHOWROOM_URL,
  showroom,
});

export const recsalesbyshowroom = (salespersonlist) => ({
  type: Constants.REC_LOAD_SALESPERSON_BY_SHOWROOM,
  salespersonlist,
});

export const saveassignrequest = (params) => ({
  type: Constants.REQ_SAVE_ASSIGN_REQUEST,
  url: Constants.API_URLS.REQ_SAVE_ASSIGN_REQUEST_URL,
  params,
});

export const recsaveassignrequest = (isAssignRequestSuccess) => ({
  type: Constants.REC_SAVE_ASSIGN_REQUEST,
  isAssignRequestSuccess,
});

export const reqAvailableSlots = (params) => ({
  type: Constants.REQ_AVAILABLE_SLOTS,
  url: Constants.API_URLS.REQ_AVAILABLE_SLOTS_URL,
  params,
});

export const recAvailableSlots = (availableslots) => ({
  type: Constants.REC_AVAILABLE_SLOTS,
  availableslots,
});

export const savereschedulerequest = (params) => ({
  type: Constants.REQ_SAVE_RESCHEDULE_REQUEST,
  url: Constants.API_URLS.REQ_SAVE_RESCHEDULE_REQUEST_URL,
  params,
});

export const recsavereschedulerequest = (isRescheduleRequestSuccess) => ({
  type: Constants.REC_SAVE_RESCHEDULE_REQUEST,
  isRescheduleRequestSuccess,
});

export const cancellationrequest = (params) => ({
  type: Constants.REQ_CANCELLATION_REQUEST,
  url: Constants.API_URLS.REQ_CANCELLATION_REQUEST_URL,
  params,
});

export const reccancellationrequest = (isCancellationSuccess) => ({
  type: Constants.REC_CANCELLATION_REQUEST,
  isCancellationSuccess,
});

export const completionrequest = (params) => ({
  type: Constants.REQ_COMPLETION_REQUEST,
  url: Constants.API_URLS.REQ_COMPLETION_REQUEST_URL,
  params,
});

export const reccompletionrequest = (isCompletionSuccess) => ({
  type: Constants.REC_COMPLETION_REQUEST,
  isCompletionSuccess,
});
