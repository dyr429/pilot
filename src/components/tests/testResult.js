import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useHistory } from "react-router-dom";

const styles = theme => ({
    container: {
        margin: 20

    },
    nextbutton:{
        marginTop: 20,
        justifyContent: 'center'
    }


});

const testResult = (props)=> {
    const {classes} = props;
    let history = useHistory();
    const testName = localStorage.getItem('testname');
    const score = localStorage.getItem('score');
    const nextLink = localStorage.getItem('nextlink');
    const handleNext = ()=>{
        history.push(nextLink);
    }
    return (
        <div className={classes.container}>
            <Typography variant="h5" component="h2">
                You finished {testName}, your score is {score}.
            </Typography>
            <Button className={classes.nextbutton} variant="contained" color="primary" onClick={handleNext}>
            Next
            </Button>
        </div>
    );

}


export default withStyles(styles)(testResult);
