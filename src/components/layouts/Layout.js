import React,{ useState }from 'react';
import VisBlock from "./VisBlock";
const Layout = ({questions,expText,classes,showExpText}) => {
    const chartWidth = 380;
    const chartHeight = 380;
    let question = questions[0];

    return(
        <div>
            <VisBlock chartWidth={chartWidth}
                      chartHeight={chartHeight}
                      question = {question}
                      expText = {expText}
                      classes = {classes}
                      showExpText = {showExpText}/>
            <p className={classes.feedBack} style={{display: 'inline-block',visibility:showExpText?'':'hidden'}}>{expText}</p>
        </div>


    );

}
export default Layout