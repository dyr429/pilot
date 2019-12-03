import { sessionRef, sessionId, sessionsRef, trialsRef, assignCurrentSessionRef } from "../config/firebase";
import { tsv, csv } from 'd3.promise';
import {expData} from '../config/exp';
import * as experimentParams from '../config/cm_experiment/experimentParameters';
import { FETCH_CMTABLE, FETCH_CM_EXP_DATA_TABLE, FETCH_CM_TRIAL_DATA_TABLE ,FETCH_CM_EXP_DATA, ITERATE_TRIAL_INDEX} from './types';
import {exp} from "../config/exp"
import * as experiments from "../config/expTypes"
export const addTrial = newAnswer => async dispatch => {
  console.log('Add trial:');
  console.log(newAnswer);
  let sid = localStorage.getItem("sessionId")
  if(sessionId){
    trialsRef.push({
      experimentName: experimentParams.EXPERIMENT_ID,
      sessionId,
      ...newAnswer,
    });
  }
  else{
    trialsRef.push({
      experimentName: experimentParams.EXPERIMENT_ID,
      sid,
      ...newAnswer,
    });
  }

};

export const addSession = (sessionInfo) => async dispatch => {
  sessionsRef.push({
    experimentName: experimentParams.EXPERIMENT_ID,
    ...sessionInfo,
  })
    .then((snap) => {
      const key = snap.key;
      console.log('Session Start: ' + key);
      assignCurrentSessionRef(key);
    });
}

export const addToSession = (sessionInfo) => async dispatch => {
  sessionRef.update({
    ...sessionInfo,
  });
  console.log('Adding to session');
}



export const loadCmExpData = () => dispatch => {
  return tsv(expData)
      .then(data => {
        dispatch({
          type: FETCH_CM_EXP_DATA_TABLE,
          payload: data.map(d=>{
            let obj={};
            obj['data']=[];
            obj['data'].push(d['A']);
            obj['data'].push(d['B']);
            obj['data'].push(d['C']);
            obj['data'].push(d['D']);
            obj['data'].push(d['E']);
            obj['vis']=d['vis'];
            obj['style']=d['type'].split('_')[0];
            obj['color']=d['type'].split('_')[1];
            obj['uniqueTrialId']=d['ExpIndex']
            obj['selectedIndices']=[d['smallChar'].charCodeAt(0)-65,d['largeChar'].charCodeAt(0)-65] || [];
            obj['repeatIndex']=d['ExpRepeatIndex'];
            obj['realSmall']=d['smallChar'];
            obj['realLarge']=d['largeChar'];
            obj['realPercentage']=d['A_frac'];
            obj['expType']=d['expType'];
            obj['text']=d['text'];
            obj['trial']=d['trial'];
            obj['currentIndex']=d['ExpIndex'];
            return obj;
          }),
        })
      })
}

export const loadJndExpData = () => dispatch =>{
  return tsv(expData)
      .then(data =>{
        dispatch({
          type:FETCH_CM_EXP_DATA,
          payload: data.map(d=>{
            let obj={};
            obj['DataSize']=+d['DataSize'];
            obj['TrialType']=d['TrialType'];
            obj['BaseCorr']=+d['BaseCorr'];
            obj['StartDelta']=+d['StartDelta'];
            obj['Direction']=d['Direction'];
            obj['DeltaRight']=+d['DeltaRight'];
            obj['DeltaWrong']=+d['DeltaWrong'];
            return obj;
          }),
        })
      })
}
export const iterateTrialIndex = () => dispatch => {
  return dispatch({
    type:ITERATE_TRIAL_INDEX,
  });
}





