import React,{ useState }from 'react';
import VisBlock from "./VisBlock";
import ReactTooltip from "react-tooltip";
import {findDOMNode} from "react-dom";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ( {
    selectHidden: {
        visibility:'hidden'
    },
    chartSelect:{
        ontWeight:'bold',
        fontStyle:'italic',
        textAlign:'center',
    }
} );


const Layout_two_JND = ({classes,questions,expText,showExpText,leftSelected,rightSelected,handleSelectLeft,handleSelectRight}) => {
    const chartWidth = 380;
    const chartHeight = 380;
    let onMouseOverHandler = ()=>{
        ReactTooltip.show();

    }

    return(
        <div style = {{'display':'flex', 'flexFlow':'row nowrap', 'justifyContent':'center'}} >
            <div data-tip data-for="tooltipLeft"
                 onMouseOver = {onMouseOverHandler}
                 onClick = {handleSelectLeft}>
                <VisBlock chartWidth={chartWidth}
                          chartHeight={chartHeight}
                          question = {questions[0]}
                          expText = {expText}
                          classes = {classes}
                          showExpText = {false}/>
                <ReactTooltip id='tooltipLeft'><span>Select Left!</span></ReactTooltip>
                <p className = {leftSelected?classes.chartSelect:classes.selectHidden} >Selected!</p>
            </div>
            <div data-tip data-for="tooltipRight"
                 onMouseOver = {onMouseOverHandler}
                 onClick = {handleSelectRight}>
                <VisBlock chartWidth={chartWidth}
                          chartHeight={chartHeight}
                          question = {questions[1]}
                          expText = {expText}
                          classes = {classes}
                          showExpText = {showExpText}/>
                <ReactTooltip id='tooltipRight'><span>Select Right!</span></ReactTooltip>
                <p className = {rightSelected?classes.chartSelect:classes.selectHidden}>Selected!</p>
            </div>
        </div>


    );

}
export default withStyles( styles )( Layout_two_JND );