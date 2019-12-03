import { FETCH_CMTABLE } from "../actions/types";
export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CMTABLE:
      return action.payload;
    default:
      return state;
  }
};