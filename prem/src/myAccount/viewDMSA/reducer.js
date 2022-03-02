import * as Constants from "../../constants";
import { any } from "prop-types";

export default (state = {}, { type, dmasAnnexure = any }) => {
  switch (type) {
    case Constants.RECEIVE_DMSA_ANNEXURE: {
      console.log(
        " dmasAnnexure receive data in reducer layer " +
          JSON.stringify(dmasAnnexure)
      );
      const statenew = { ...state };
      statenew.dmasAnnexure = dmasAnnexure;
      return statenew;
    }

    default:
      return state;
  }
};
