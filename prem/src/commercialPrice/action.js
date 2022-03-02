import * as Constants from "../constants";

export const requestAllPrice = () => ({
  type: Constants.REQUEST_ALL_PRICE,
  url: Constants.API_URLS.LIST_PRICE_URL,
});

export const allPriceResponse = (Price) => ({
  type: Constants.ALL_PRICE_RESPONSE,
  Price,
});
export const addPrice = (plan, price, mode, model) => (
  // console.log("mode inside action" + mode),
  {
    type: Constants.ADD_PRICE, //this will match with your saga
    url: mode === "edit" ? Constants.API_URLS.UPDATE_PRICE_URL : null,
    plan,
    price,
    mode,
    model,
  }
);

export const addPriceResponse = (isSuccess) => ({
  type: Constants.ADD_PRICE_RESPONSE,
  isSuccess,
});


export const requestChangeVariablePrice = (variablePrice) => ({
  type: Constants.REQUEST_VARIABLE_PRICE,
  url: Constants.API_URLS.VARIABLE_PRICE_CHNAGE,
  variablePrice,
});

export const responcesChangeVariablePrice = (variablePriceChnage) => ({
  type: Constants.RESPONCES_VARIABLE_PRICE,
  variablePriceChnage,
});