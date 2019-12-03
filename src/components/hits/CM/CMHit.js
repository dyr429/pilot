import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { shuffle } from 'lodash';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import MobileStepper from '@material-ui/core/MobileStepper';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as actions from "../../../actions";
import Header from '../../Header';
import { REPEAT_COUNT, VIS_TYPES, DATA_SIZE ,time_limit_lowerbound, BREAK_TRIAL_NUM,INSERT_BREAK,QUESTION_LINE_1,QUESTION_LINE_2} from '../../../config/cm_experiment/experimentParameters';
import { Typography } from "@material-ui/core";
import StackBarChart from "../../charts/StackBarChart";
import { stack} from 'd3-shape'
import Layout from "../../layouts/Layout"
import Layout_two_JND from "../../layouts/Layout_two_JND";
// Hard-coded kittens
import kitten1 from '../../../res/kitten1.jpg';
import kitten2 from '../../../res/kitten2.jpg';
import kitten3 from '../../../res/kitten3.jpg';
import kitten4 from '../../../res/kitten4.png';

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 800,
    },
    formControl: {
        display: 'inline-block',
        marginLeft: theme.spacing.unit * 2,
        marginBottom: theme.spacing.unit,
    },
    button: {
        marginLeft: theme.spacing.unit * 2,
    },
    outlinedInput: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: 'auto',
        marginRight: 'auto',
        labelWidth:100,
    },
    visChart: {
        display: 'inline-block',
        margin: 'auto',
    },
    feedBack:{
        width:220,
        margin:'auto',
    }
});


let cmQuestionList = [];
class CMHit extends Component {
    state = {
        currentTrailIndex: +localStorage.getItem('lastTrialIndex')||0,
        questionListIndex: +localStorage.getItem('lastQuestionListIndex')||0,
        trainingNumber: 0,
        selectedPercentage: '',
        invalidAnswer: false,
        buttonstatus: true,
        showText:true,
        expLength:0,
        expText:'',
        showExpText:false,
        mainTrialLength:0,
        trialBtn:'Check Answer',
        trialInstruction:'You can press Check Answer to check your response and to advance to the next question.',
        trialErrorText:'',
        inputStatus:false
    };

    static contextTypes = {
        router: PropTypes.object,
    };

    trialStartTime;

    constructor(props) {
        super(props);
        this.trialStartTime = Date.now();
        this.props.loadCmExpData();
        this.percentageInput = React.createRef();

    }

    initQuestionList() {
        console.log('INIT EXP: ',this.props.expData);
        cmQuestionList = [...this.props.expData];

        let initLeng = this.getExpLength(0);
        let mainLeng = 0;
        cmQuestionList.forEach(d=>{
            if(d['expType']==='main') mainLeng++;
        });

        const trainingNumber = cmQuestionList.findIndex(q => q.expType === 'transition');
        console.log('TrainingNumber: ', trainingNumber);

        // Insert breaks
        let numBreaks = Math.floor((cmQuestionList.length - (trainingNumber + 1)) / BREAK_TRIAL_NUM);
        Array.from(Array(numBreaks-1).keys()).forEach(i => {
            cmQuestionList.splice((trainingNumber + 1) + (i+1) * BREAK_TRIAL_NUM + i, 0, { expType: 'break'});
        });

        this.setState({
            expLength:initLeng,
            expText:cmQuestionList[0].text,
            mainTrialLength:mainLeng,
            trainingNumber,
        });
    }

    iterateThroughtheQuestionList() {

        const { currentTrailIndex, questionListIndex, expLength} = this.state;
        const newIndex = currentTrailIndex===expLength-1?0:currentTrailIndex + 1;
        const newQuestionListIndex=questionListIndex+1;

        let initLeng = this.getExpLength(questionListIndex+1);
        this.setState({
            selectedPercentage: '',
            questionListIndex:newQuestionListIndex,
            currentTrailIndex: newIndex,
            invalidAnswer: false,
            buttonstatus: true,
            expText:cmQuestionList[questionListIndex+1].text,
            showExpText:false,
            expLength:newIndex===0?initLeng:expLength,
            inputStatus: false
        });

        // change button and instruction for trials
        if(cmQuestionList[questionListIndex]['expType']==='trial') {
            this.setState({
                trialBtn:'Check Answer',
                trialInstruction: 'You can press Check Answer to check your response and to advance to the next question.'
            });
        } else {
            this.setState({
                trialBtn:'Next',
                trialInstruction: 'Please click Next or hit enter to move to the next trial.',
                trialErrorText: ''
            });
        }

        this.trialStartTime = Date.now();
    }

    componentDidMount() {
        if (this.state.buttonstatus) {
            setTimeout(() => {
                this.setState({ buttonstatus: false });
            }, time_limit_lowerbound);
        }
        window.endTrial = ()=>{
            this.props.history.push("/Debrief");
        }
        document.addEventListener("keypress", this.handleKeyboardEvents, false);

    }

    componentWillUnmount() {
        document.removeEventListener("keypress", this.handleKeyboardEvents, false);
    }

    componentDidUpdate() {
        if (this.state.buttonstatus) {
            setTimeout(() => {
                this.setState({ buttonstatus: false });
            }, time_limit_lowerbound);
        }
    }

    handleKeyboardEvents = event => {
        const key = event.key;
        switch (key) {
            case 'Enter':
                this.handleSubmitAnswer(event);
                break;
            default:
                break;
        }

    }

    handleChangePercentage = event => {
        this.setState({ selectedPercentage: event.target.value });
    }

    handleSubmitAnswer = (event) => {
        const {
            selectedPercentage,
            currentTrailIndex,
            questionListIndex,
            showExpText,
        } = this.state;

        if(cmQuestionList[questionListIndex]['expType']==='transition' || cmQuestionList[questionListIndex]['expType']==='break'){
            this.iterateThroughtheQuestionList();
            return;
        }
        event.preventDefault();

        // Check empty answer and wrong percentage
        if (selectedPercentage === '') {
            this.setState({
                invalidAnswer: true,
            })
            return;
        } else if (selectedPercentage < 0 || selectedPercentage > 100) {
            this.setState({
                invalidAnswer: true,
                trialErrorText: 'Answers should range between 0 - 100 percent.'
            })
            return;
        }

        // for the trial to show instruction
        if(!showExpText && cmQuestionList[questionListIndex]['expType']==='trial'){
            this.setState({
                invalidAnswer: false,
                showExpText:true,
                trialBtn:'Next',
                trialInstruction:'Saved. Please click Next or hit enter to move to the next trial.',
                trialErrorText: '',
                inputStatus: true
            });
            return;
        }
        const { addTrial } = this.props;
        const { trialStartTime } = this;
        const { selectedIndices, data, vis, repeatIndex, uniqueTrialId, realLarge, realPercentage, expType, trial, currentIndex } = cmQuestionList[questionListIndex];
        addTrial({
            currentIndex,
            trialStartTime,
            trialEndTime: Date.now(),
            vis,
            data,
            uniqueTrialId,
            repeatIndex,
            selectedIndices,
            realLarger:realLarge,
            realPercentage,
            selectedPercentage,
            expType,
            trial,
        });
        //add to local storage
        localStorage.setItem('lastTrialIndex', currentTrailIndex);
        localStorage.setItem('lastQuestionListIndex', questionListIndex);
        if (questionListIndex === cmQuestionList.length-1) {
            localStorage.clear()
            this.props.history.push("/simplecode");
            return;
        }

        this.percentageInput.blur();
        this.iterateThroughtheQuestionList();

        if (questionListIndex < cmQuestionList.length && (cmQuestionList[this.state.questionListIndex]['expType']==='trial' || cmQuestionList[this.state.questionListIndex]['expType']==='main')) {
            this.percentageInput.focus();
        }
    }

    getExpLength(start){
        let res=1;
        for(let i=start;i<cmQuestionList.length;i++){
            if(i>start && cmQuestionList[i]['expType']===cmQuestionList[i-1]['expType']) res++;
            else if(i>start && cmQuestionList[i]['expType']!=cmQuestionList[i-1]['expType']) break;
        }
        return res;
    }


    render() {
        const { classes, data, expData } = this.props;
        const { currentTrailIndex, invalidAnswer, expText, showExpText, expLength, questionListIndex, mainTrialLength, trainingNumber } = this.state;
        
        if (expData.length === undefined) {
            console.log('loading the expData.')
            return (<div />)
        }
        if (cmQuestionList.length === 0 || this.state.expLength===0) {
            this.initQuestionList();
            this.trialStartTime = Date.now();
            return (<div></div>)
        }
        if(cmQuestionList[questionListIndex]['expType']==='transition'){
            return(
                <div>
                    <Header title="Questions" />
                    <div className={classes.container}>
                        <div><p>Press the "Next" button in order to start the experiment!</p>
                        <p>Do not press the "Back" button on your browser at any time. Doing so will lose 
                        any progress. </p>
                        <p>You may start whenever you are ready.</p>
                        </div>
                        <Button
                        id="submitButton"
                        disabled={this.state.buttonstatus}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmitAnswer}
                        style={{marginTop:50}}
                        >Next</Button>
                    </div>
                </div>
            )
        }
        if(cmQuestionList[questionListIndex]['expType']==='break'){
            let nextExpLength=this.getExpLength(questionListIndex+1);
            let kittens = [kitten1, kitten2, kitten3, kitten4];
            return(
                <div>
                    <Header title="Questions" />
                    <div className={classes.container}>
                        <div><p>Take a break! There will be {nextExpLength} trials in the next section before another break or the end of the experiment. </p>
                            <p>You can start whenever you are ready. </p>
                            <img src={kittens[(Math.floor(questionListIndex / BREAK_TRIAL_NUM)-1) % 4]} width={400} />
                        </div>
                        <Button
                        id="submitButton"
                        disabled={this.state.buttonstatus}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmitAnswer}
                        style={{marginTop:50}}
                        >Next</Button>
                    </div>
                </div>
            )
        }

        const currentStep = cmQuestionList[questionListIndex].expType === 'trial' ? questionListIndex + 1 : questionListIndex + 1 - (trainingNumber + 1) - (Math.floor((questionListIndex + 1)/BREAK_TRIAL_NUM));
        const totalStep = cmQuestionList[questionListIndex].expType === 'trial' ? trainingNumber : cmQuestionList.length - (trainingNumber + 1) - (Math.floor(cmQuestionList.length / BREAK_TRIAL_NUM) - 1);
        let questions = [];
        questions.push(cmQuestionList[questionListIndex])
        return (
            <div>
                <Header title="Questions" />
                <div className={classes.container}>

                    <MobileStepper
                        variant="progress"
                        steps={11}
                        position="static"
                        activeStep={currentStep}
                        className={classes.root}
                        backButton={
                            <div>Progress {currentStep} / {totalStep}</div>
                        }
                    />

                    <Layout   questions = {questions}
                              expText = {expText}
                              classes = {classes}
                              showExpText = {this.state.showExpText} />

                    {/*<Layout_two   questions = {questions}*/}
                    {/*          expText = {expText}*/}
                    {/*          classes = {classes}*/}
                    {/*          showExpText = {this.state.showExpText} />*/}


                    <div>
                    <FormControl required error={invalidAnswer} className={classes.formControl}>
                        <FormLabel component="legend" required={false}>
                        <div>
                            <p>{QUESTION_LINE_1}</p>
                            <p>{QUESTION_LINE_2}</p>
                            <p>{this.state.trialErrorText}</p>
                        </div>
                        </FormLabel>
                        <OutlinedInput
                            autoFocus={true}
                            className={classes.outlinedInput}
                            id="component-outlined"
                            value={this.state.selectedPercentage}
                            inputRef={(input) => { this.percentageInput = input; }}
                            type="number"
                            onChange={this.handleChangePercentage}
                            readOnly={this.state.inputStatus}
                            labelWidth={0}
                        />
                        <FormLabel required={false}> %</FormLabel>
                        <Typography>{this.state.trialInstruction}</Typography>
                    </FormControl>
                    </div>
                    <Button
                        id="submitButton"
                        disabled={this.state.buttonstatus}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmitAnswer}
                    >{this.state.trialBtn}</Button>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ expData }) => {
    return {
        expData,
    };
};

export default connect(mapStateToProps, actions)(withStyles(styles)(CMHit));
