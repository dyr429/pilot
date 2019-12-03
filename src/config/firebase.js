import * as firebase from "firebase";

import { FirebaseConfig } from "./cm_experiment/keys";
firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();
export const sessionsRef = databaseRef.child('sessions');
export let sessionId = '';
export let sessionRef;
export const trialsRef = databaseRef.child('trials');

export const assignCurrentSessionRef = (id) => {
    localStorage.clear()
    localStorage.setItem('sessionId', id);
    sessionId = id;
    sessionRef = sessionsRef.child(id);
}