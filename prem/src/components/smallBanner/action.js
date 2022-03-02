import * as Constants from "../../constants";

export const SmallbannerList = () => (
  console.log(" smallbanner action"),
  {
  type: Constants.REQUEST_ALL_PRICE_LIST,
  url: Constants.API_URLS.REQUEST_ALL_PRICE_LIST_URL,
});

export const SmallbannerListResponse = (isSuccess) => ({
  type: Constants.ALL_PRICE_RESPONSE_LIST,
  isSuccess,
});

