import { FETCH_CM_EXP_DATA_TABLE,FETCH_CM_EXP_DATA } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_CM_EXP_DATA_TABLE:
      return action.payload;
    case FETCH_CM_EXP_DATA:
      return action.payload;
    default:
      return state;
  }
};