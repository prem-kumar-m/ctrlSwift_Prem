import * as Constants from "../constants";
import { any } from "prop-types";

export default (
  state = {},
  {
    type,
    showroomlist = [],
    isSuccess = any,
    reports = [],
    count =[],
    users = "",
    salesPersonlist = [],
  }
) => {
  switch (type) {
    //   case Constants.RECEIVE_LOAD_SHOWROOM_LIST_DATA: {
    //     console.log(" RECEIVE_LOAD_SHOWROOM_LIST_DATA receive data in reducer layer " + JSON.stringify(showroomlist));
    //     const statenew = {...state};
    //     statenew.showroomlist = showroomlist;
    //     return statenew;
    //   }
    //   case Constants.RECEIVE_LOAD_SALESPERSON_LIST_DATA: {
    //     console.log(" RECEIVE_LOAD_SALESPERSON_LIST_DATA receive data in reducer layer " + JSON.stringify(salesPersonlist));
    //     const statenew = {...state};
    //     statenew.salesPersonlist = salesPersonlist;
    //     return statenew;
    //   }

    case Constants.ALL_REPORTS_RESPONSE: {
      console.log(" report List response in reducer layer \n" + JSON.stringify(reports));
      console.log(" report List response in reducer layer \n" + count);

      const statenew = { ...state };
      statenew.count = count;
      statenew.reports =reports;
      return statenew;
    }
    // case Constants.RECEIVE_LOAD_USER_DATA: {
    //   console.log(" users in reducers" + JSON.stringify(users));
    //   const statenew = {...state};
    //   statenew.users = users;
    //   return statenew;
    // }

    default:
      return state;
  }
};
