import * as Constants from "../../constants";
export const requestticketslist = () => (
    console.log("testing"),
    {
      type: Constants.REQUEST_ALL_TICKETS,
      url: Constants.API_URLS.LIST_TICKETS_URL,
    }
  );

  export const allTicketsResponse = (ticketslist) => ({
    type: Constants.ALL_TICKETS_RESPONSE,
    ticketslist,
  });