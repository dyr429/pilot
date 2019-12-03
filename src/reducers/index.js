import { combineReducers } from "redux";

import data from "./dataReducer";
import expData from './expDataReducer';
import trialIndex from "./trialIndexReducer";



export default combineReducers({
    data,
  trialIndex,
  expData,
});