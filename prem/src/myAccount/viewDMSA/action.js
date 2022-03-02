import * as Constants from "../../constants";

export const requestDmsaAnnexure = (state) => ({
  type: Constants.REQUEST_DMSA_ANNEXURE,
  url: Constants.API_URLS.DMAS_ANNEXURE_URL,
  state,
});

export const receiveDmsaAnnexure = (dmasAnnexure) => ({
  type: Constants.RECEIVE_DMSA_ANNEXURE,
  dmasAnnexure,
});
