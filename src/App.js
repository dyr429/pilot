import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import {baseName} from "./config/exp";

//cm
import CMHit from './components/hits/CM/CMHit';
import CMConsent from './components/hits/CM/CMConsent';
import Debrief from "./components/hits/CM/Debrief";
import JNDOneValueHit from './components/hits/JNDOneValue/JNDOneValueHit';
//jnd
// import Consent from './components/hits/JNDCorrelation/Consent';
// import JNDHit from './components/hits/JNDCorrelation/JNDHit';
// import Debrief from './components/hits/JNDCorrelation/Debrief';
// import Break from './components/hits/JNDCorrelation/Break';
//tests
import paperFoldingTest from "./components/tests/paperFoldingTest";
import VLAT from "./components/tests/VLAT";
import numeracy from "./components/tests/numeracy";
import testResult from "./components/tests/testResult";
import simpleCode from "./components/hits/CM/simpleCode";


class App extends Component {

    //CM experiment
  render() {
    return (
      <BrowserRouter basename= {baseName}>
        <div className="container">
          <Route exact path="/" component={CMConsent} />
          <Route exact path="/simplecode" component={simpleCode} />
          {/*<Route path="/hit" component={JNDOneValueHit} />*/}
          <Route path="/hit" component={CMHit} />
          <Route path="/debrief" component={Debrief} />
          <Route path="/paperfolding" component={paperFoldingTest} />
          <Route path="/vlat" component={VLAT} />
            <Route path="/numeracy" component={numeracy} />
          <Route path="/result" component={testResult} />

        </div>
      </BrowserRouter>
    );
  }

  //JND experiment
  //   render() {
  //       return (
  //           <BrowserRouter basename={baseName}>
  //               <div className="container">
  //                   <Route exact path="/" component={Consent} />
  //                   <Route path="/hit" component={JNDHit} />
  //                   <Route path="/break" component={Break} />
  //                   <Route path='/Debrief' component={Debrief} />
  //               </div>
  //           </BrowserRouter>
  //
  //       );
  //   }

}

export default App;
