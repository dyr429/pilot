import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';
import * as actions from "../../../actions";
import Header from '../../Header';
import queryString from 'query-string'

const styles = theme => ({
    container: {
        marginLeft: "auto",
        marginRight: 'auto',
        width: 800,
    },
    paragraph: {
        margin: theme.spacing.unit,
        lineHeight: 3
    },
    button: {
        marginTop: 10,
        marginLeft: "40%"
    },
    formControl: {
        display: 'block',
        margin: theme.spacing.unit,
    },
    workerID:{
        textAlign: 'center',
        margin: 20
    }
});

class CMConsent extends Component {
    state = {
        start: false,
        workerId: queryString.parse(this.props.location.search).UID||'',
        emptyAnswer: queryString.parse(this.props.location.search).UID == undefined ,
        mainTrialLength:0,
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    constructor(props) {
        super(props);
        this.props.loadCmExpData();
    }

    componentDidMount(){
        const values = queryString.parse(this.props.location.search)
        console.log(values)
    }

    componentDidUpdate() {

    }

    handleStart =()=> {
        const { addSession } = this.props;
        const { workerId } = this.state;

        // Check answer
        if(workerId === '') {
            this.setState({
                emptyAnswer: true,
            })
            alert("You must access this page via Prolific or Amazon Mechanical Turk")
            return;
        }

        // Add session
        addSession({
            sessionStartTime: Date.now(),
            workerId,
        });

        // Start
        this.props.history.push("/hit");
    }

    handleChangeWorkerId = event => {
        this.setState({
            workerId: event.target.value,
        });
    }



    render() {
        const { classes } = this.props;
        const { emptyAnswer,workerId } = this.state;
        return (
            //cm motion
            <div>
                <Header title="Consent" />
                <div className={classes.container}>
                    <Typography className={classes.workerID}><b>WELCOME! Your Worker ID is: </b> {workerId}</Typography>
                    <Typography component="div" className={classes.paragraph}>
                        In the following sections, you will view a series of basic visualization charts
                        You will be asked to select the larger of the 2 values and guess what percentage the smaller value represents of the larger.
                        For example, for two flow charts, if you think the slower one is half speed of faster one, please type 50</Typography>

                    <b>This experiment should take around 10 minutes, with 40 trials in total. There will be a
                        "break" screen every 10 trials. Please do take a break if needed.</b>
                    {this.state.emptyAnswer &&
                    <FormControl required error={emptyAnswer} className={classes.formControl}>
                        <FormLabel component="legend">If we cannot detect your workerID, please enter your worker ID
                            here:</FormLabel>
                        <Input
                            className={classes.input}
                            value={this.state.workerId}
                            onChange={this.handleChangeWorkerId}
                        />
                    </FormControl>
                    }

                    <div>
                        Before conducting the main experiment, you will see some training trials to familiarize yourself with the experimental task.
                    </div>
                    <p></p>
                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleStart}>Start</Button>

                </div>
            </div>

            // CM regular
            // <div>
            //     <Header title="Consent" />
            // <div className={classes.container}>
            //     <Typography className={classes.workerID}><b>WELCOME! Your Worker ID is: </b> {workerId}</Typography>
            //     <Typography component="div" className={classes.paragraph}>
            //     In the following sections, you will view a series of basic visualization charts (e.g., bar chart, pie chart).
            //     Each chart will have several values on it, with 2 values being marked with dots ●.
            //     You will be asked to select the larger of the 2 values and guess what percentage the smaller value represents of the larger.
            //     At the end, you will be asked several demographic questions.</Typography>
            //
            //     <b>This experiment should take around 1 hour 30 minutes, with {this.props.expData.length-1} trials in total. There will be a
            //     "break" screen every 60 trials. Please do take a break if needed.</b>
            //     {this.state.emptyAnswer &&
            //     <FormControl required error={emptyAnswer} className={classes.formControl}>
            //         <FormLabel component="legend">If we cannot detect your workerID, please enter your worker ID
            //             here:</FormLabel>
            //         <Input
            //             className={classes.input}
            //             value={this.state.workerId}
            //             onChange={this.handleChangeWorkerId}
            //         />
            //     </FormControl>
            //     }
            //
            //     <div>
            //     Before conducting the main experiment, you will see some training trials to familiarize yourself with the experimental task.
            //     </div>
            //     <p></p>
            //     <Button variant="contained" color="primary" className={classes.button} onClick={this.handleStart}>Start</Button>
            //
            // </div>
            // </div>
        );
    }
}

function mapStateToProps({ expData }) {
    return { expData };
}

export default connect(mapStateToProps, actions)(withStyles(styles)(CMConsent));
