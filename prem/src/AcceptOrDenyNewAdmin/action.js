import * as Constants from "../constants";

export const requestAllClients = (ticket1) => (
  // console.log("action "+ticket1),
  {
  type: Constants.REQUEST_ALL_CLIENTS,
  url: Constants.API_URLS.REQUEST_ALL_CLIENTS_URL,
  ticket1,
});





export const allClientsResponse = (clientlist) => ({
  type: Constants.ALL_CLIENTS_RESPONSE,
  clientlist,
});




export const addClient = (ticket1) => (
  // console.log(" action " + ticket1),
  {
    type: Constants.ADD_CLIENT, //this will match with your saga
    url:Constants.API_URLS.ADD_CLIENT_URL,
    ticket1,
  }
);

export const addClientResponse = (isSuccess) => (
  // console.log(" action " + isSuccess),
  {
  type: Constants.ADD_CLIENT_RESPONSE,
  isSuccess,
});

export const reqdeleteClient = (ticket1) => ({
  type: Constants.DELETE_CLIENT, //this will match with your saga
  url: Constants.API_URLS.DELETE_CLIENT_URL,
  ticket1,
});

export const deleteClientResponse = (isSuccess) => ({
  type: Constants.DELETE_CLIENT_RESPONSE,
  url: Constants.API_URLS.DELETE_CLIENT_URL,
  isSuccess,
});
