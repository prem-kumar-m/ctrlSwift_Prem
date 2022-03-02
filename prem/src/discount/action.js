import * as Constants from "../constants";

export const requestAllDiscount = () => ({
  type: Constants.REQUEST_ALL_DISCOUNT,
  url: Constants.API_URLS.LIST_DISCOUNT_URL,
});

export const allDiscountResponse = (Discount) => ({
  type: Constants.ALL_DISCOUNT_RESPONSE,
  Discount,
});
export const addDiscount = (subscription, discount, mode) => (
  // console.log("mode inside action" + mode),
  {
    type: Constants.ADD_DISCOUNT, //this will match with your saga
    url: mode === "edit" ? Constants.API_URLS.UPDATE_DISCOUNT_URL : null,
    subscription,
    discount,
    mode,
  }
);

export const addDiscountResponse = (isSuccess) => ({
  type: Constants.ADD_DISCOUNT_RESPONSE,
  isSuccess,
});
