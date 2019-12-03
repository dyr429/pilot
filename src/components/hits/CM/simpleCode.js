import React, { Component } from "react";
import { connect } from "react-redux";
// import NumberFormat from 'react-number-format';
import { shuffle } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import * as actions from "../../../actions";
import Header from '../../Header';
import {time_limit_lowerbound} from '../../../config/cm_experiment/experimentParameters';

const styles = theme => ({
    container: {
        margin: 20

    },
    nextbutton:{
        marginTop: 20,
        justifyContent: 'center'
    }


});
const simpleCode = (props)=> {
    const {classes} = props
    return (
        <div className={classes.container}>
            <Typography variant="h5" component="h2">
                Thank you for taking our experiment. Your code is 13BREW
            </Typography>

        </div>
    );
}

export default withStyles(styles)(simpleCode);