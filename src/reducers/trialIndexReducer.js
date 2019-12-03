import {ITERATE_TRIAL_INDEX} from '../actions/types';
export default (state=0,action) =>{
    switch (action.type) {
        case ITERATE_TRIAL_INDEX:
            return state+1;
        default:
            return state;
    }
};