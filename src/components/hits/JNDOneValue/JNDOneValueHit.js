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
import { REPEAT_COUNT, VIS_TYPES, DATA_SIZE ,time_limit_lowerbound, BREAK_TRIAL_NUM,INSERT_BREAK} from '../../../config/cm_experiment/experimentParameters';
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
import * as d3 from "d3";

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
class JNDOneValueHit extends Component {
    state = {
        hitType: "main",
        trialInstruction: "please select ",
        dataAnchor:[20,50,80,30,60,70,40],
        anchor: 20,
        dataOffset:5,
        dataLeft :15,
        dataRight: 25,
        answer:'R',
        currentIndex:0,
        currentAnchorIndex:0,
        showExpText:false,
        selectLeft:false,
        selectRight:false,
        buttonDisable: true,
        questionDescription: "Please select which flow is moving faster?",
        dataGenPattern:"decrease"



    };

    trialStartTime;

    constructor(props) {
        super(props);
        this.trialStartTime = Date.now();
         //this.initData();
    }

    initData() {


    }

    handleLeftSelection = () =>{
        this.setState({
                selectLeft: true,
                selectRight: false,
                buttonDisable: false,
        })
    }

    handleRightSelection = ()=>{
        this.setState({
            selectLeft: false,
            selectRight: true,
            buttonDisable: false,
        })
    }

    componentDidMount() {


    }

    componentWillUnmount() {
        //document.removeEventListener("keypress", this.handleKeyboardEvents, false);
    }

    componentDidUpdate() {

    }

    nextTrial(){
        d3.selectAll("svg > *").remove();
        const {hitType,dataAnchor,dataOffset,currentIndex,currentAnchorIndex,answer,selectLeft,selectRight,anchor,dataGenPattern} = this.state
        let selectAnswer;
        if(selectLeft){
            selectAnswer = 'L'
        }else{
            selectAnswer = 'R'
        }

        let newOffset = dataOffset;
        let newAnchorIndex = currentAnchorIndex;
        let newDataGenPattern;

        if(dataGenPattern == "decrease"){
            if(answer == selectAnswer && dataOffset>0){
                newOffset--;
                newDataGenPattern = "decrease";
            }else{
                newOffset = newOffset+0.3
                newDataGenPattern = "increase";
            }
        }else{
            if(answer != selectAnswer){
                newOffset = newOffset+0.3;
                newDataGenPattern = "increase";
            }else{
                newOffset = 5
                newAnchorIndex++
                newDataGenPattern = "decrease";
            }
        }


        if(newAnchorIndex>dataAnchor.length-1){
            this.props.history.push("/Debrief");
        }else{
            let newAnchor = dataAnchor[newAnchorIndex]
            let newDataLeft = newAnchor - newOffset
            let newDataRight = newAnchor + newOffset
            let newAnswer = 'R'
            if(Math.random()>0.5){
                [newDataLeft,newDataRight] = [newDataRight,newDataLeft];
                newAnswer = 'L'
            }
            console.log(newAnswer)
            this.setState({
                dataOffset: newOffset,
                currentAnchorIndex: newAnchorIndex,
                buttonDisable: true,
                dataLeft:newDataLeft,
                dataRight:newDataRight,
                anchor: newAnchor,
                selectLeft: false,
                selectRight: false,
                dataGenPattern: newDataGenPattern,
                answer: newAnswer
            })
        }

    }


    handleSubmitAnswer = (event) => {
        const { trialStartTime } = this;
        const {addTrial} = this.props;
        const {hitType,dataAnchor,dataOffset,currentIndex,currentAnchorIndex,answer,selectLeft,selectRight,anchor} = this.state
        let selectAnswer;
        if(selectLeft){
            selectAnswer = 'L'
        }else{
            selectAnswer = 'R'
        }
        event.preventDefault();



        addTrial({
            currentIndex,
            currentAnchorIndex,
            dataAnchor,
            anchor,
            dataOffset,
            selectAnswer,
            trialStartTime,
            trialEndTime: Date.now(),
            answer,

        })

        this.nextTrial()


    }



    render() {
        const { classes } = this.props;
        const { hitType,dataAnchor,dataOffset,currentIndex,currentAnchorIndex,dataLeft,dataRight,questionDescription} = this.state;
        const{anchor} = dataAnchor[currentAnchorIndex];
        console.log(dataLeft)

        let questionLeft = {"vis":"movingJND","style":"normal","color":"black","data": dataLeft}
        let questionRight = {"vis":"movingJND","style":"normal","color":"black","data": dataRight}
        let questions = [questionLeft,questionRight]
       // const currentStep = cmQuestionList[questionListIndex].expType === 'trial' ? questionListIndex + 1 : questionListIndex + 1 - (trainingNumber + 1) - (Math.floor((questionListIndex + 1)/BREAK_TRIAL_NUM));
       // const totalStep = cmQuestionList[questionListIndex].expType === 'trial' ? trainingNumber : cmQuestionList.length - (trainingNumber + 1) - (Math.floor(cmQuestionList.length / BREAK_TRIAL_NUM) - 1);
       // let questions = [];
       // questions.push(cmQuestionList[questionListIndex])
        return (
            <div>
                <Header title="Questions" />
                <div className={classes.container}>

                    {/*<MobileStepper*/}
                    {/*    variant="progress"*/}
                    {/*    steps={11}*/}
                    {/*    position="static"*/}
                    {/*    activeStep={currentStep}*/}
                    {/*    className={classes.root}*/}
                    {/*    backButton={*/}
                    {/*        <div>Progress {currentStep} / {totalStep}</div>*/}
                    {/*    }*/}
                    {/*/>*/}

                    <Typography variant={"h5"}> {questionDescription}</Typography>
                    <Layout_two_JND questions = {questions}
                                    expText = {"test"}
                                    classes = {classes}
                                    leftSelected={this.state.selectLeft}
                                    rightSelected={this.state.selectRight}
                                    handleSelectLeft = {this.handleLeftSelection}
                                    handleSelectRight = {this.handleRightSelection}

                                    showExpText = {false} />

                    <Button
                        id="submitButton"
                        disabled={this.state.buttonDisable}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmitAnswer}
                    >{"Submit"}</Button>
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

export default connect(mapStateToProps, actions)(withStyles(styles)(JNDOneValueHit));
