import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {addSession, addToSession, loadJndExpData} from "../../../actions";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import Header from '../../Header';

const styles = theme => ({
    container: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 800,
    },
    paragraph: {
        margin: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    formControl: {
        display: 'block',
        margin: theme.spacing.unit,
    }
});

class Consent extends Component{
    static contextTypes = {
        router: PropTypes.object,
    };
    constructor(props){
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.props.loadJndExpData();
        
    }

    state = {
        start: false,
        workerId: '',
        emptyAnswer: false,
    };

    handleStart() {
        const {addSession} = this.props;
        const {workerId} = this.state;
        if(workerId === ''){
            this.setState({
                emptyAnswer: true,
            })
            return;
        }
        addSession({
            sessionStartTime:Date.now(),
            workerId,
        });
        this.props.history.push("/hit");
    }
    handleChangeWorkerId = event => {
        this.setState({
            workerId: event.target.value,
        });
    }

    render() {
        const {emptyAnswer} = this.state;
        const {classes} = this.props;
        return (
            <div>
                <Header title="Survey" />
                <div>
                <Typography component="div" className={classes.paragraph}>In the following sections, you will view a series of scatter plot. At the end, you will be asked several demographic questions.</Typography>

                    <FormControl required error={emptyAnswer} className={classes.formControl}>
                        <FormLabel component="legend">If you'd like to proceed, please enter your worker ID:</FormLabel>
                        <Input
                            className={classes.input}
                            value={this.state.workerId}
                            onChange={this.handleChangeWorkerId}
                        />
                    </FormControl>

                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleStart}>Start</Button>

                </div>
            </div>
        );
    }
}
function mapStateToProps({expData}){
    return {
        expData,
    };
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({addSession,addToSession,loadJndExpData}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Consent));