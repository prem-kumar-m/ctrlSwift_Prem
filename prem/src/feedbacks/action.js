import * as Constants from "../constants";

export const addFeedback = (ticket, Q1, Q2, Q3, Q4, Q5) => ({
  type: Constants.ADD_FEEDBACK, //this will match with your saga
  url: Constants.API_URLS.ADD_FEEDBACK_URL,
  ticket,
  Q1,
  Q2,
  Q3,
  Q4,
  Q5,
});

export const addFeedbackResponse = (isSuccess) => ({
  type: Constants.ADD_FEEDBACK_RESPONSE,
  isSuccess,
});
