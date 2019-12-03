import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from '@material-ui/core/styles';
import Header from '../../Header';
import {generateDataSet} from '../../../functions/dataGeneration';
import MobileStepper from '@material-ui/core/MobileStepper';
import math from 'mathjs';
import ScatterPlot from '../../charts/ScatterChart';
import { time_limit_lowerbound, minFactor} from '../../../config/jnd_experiment/experimentParameters';
import ReactTooltip from 'react-tooltip';
import { ENGINE_METHOD_NONE } from "constants";
import * as actions from "../../../actions";
import * as _ from 'underscore';

const styles = theme => ({
    container: {
        marginTop: theme.spacing.unit * 2,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 1200,
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
    },
    visChart: {
        display: 'inline',
        margin: 'auto',
    },
    chartSelect:{
        fontWeight:'bold',
        fontStyle:'italic',
        textAlign:'center',
    },
    selectHidden:{
        visibility:'hidden'
    }
});

class JNDHit extends Component{
    constructor(props){
        super(props);
        this.handleLeftChartSelect = this.handleLeftChartSelect.bind(this);
        this.handleRightChartSelect = this.handleRightChartSelect.bind(this);
        const {expData, trialIndex} = this.props;
        console.log(expData)
        console.log(trialIndex)
        console.log(this.props)
        const currentTrialMeta = expData[trialIndex];
        this.state = {
            trailStartTime: Date.now(),
            currentTrialIndex: 0,
            currentTrialLength: currentTrialMeta['DataSize'],
            baseCorr: currentTrialMeta['BaseCorr'],
            controlCorr: currentTrialMeta['BaseCorr']+currentTrialMeta['StartDelta'],
            delta: currentTrialMeta['StartDelta'],
            deltaRight:currentTrialMeta['DeltaRight'],
            deltaWrong:currentTrialMeta['DeltaWrong'],
            buttonDisabledStatus: true,
            dataAry:null,
            deltaAry:[],
            factor: 1,
            selectLeft: false,
            selectRight: false,
            candidateAns:-1,
            invalidAnswer: false,
        }
        // dataSet: [x1, y1], [x2, y2] .. 
    }
    componentDidMount() {
        if (this.state.buttonstatus) {
            setTimeout(() => {
                this.setState({ buttonstatus: false });
            }, time_limit_lowerbound);
        }
        document.addEventListener("keydown", this.handleKeyboardEvents, false);
        if(this.state.dataAry==null) this.createDataAry();
        window.endTrial = ()=>{
            this.props.history.push("/Debrief");
        }
        console.log('expData: ',this.props.expData);

    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyboardEvents, false);
    }

    componentDidUpdate() {
        if (this.state.buttonstatus) {
            setTimeout(() => {
                this.setState({ buttonstatus: false });
            }, time_limit_lowerbound);
        }
        console.log('Update Trialindex:',this.props.trialIndex);
        
        if(this.props.expData[this.props.trialIndex]['TrialType']==='break'){
            console.log('Break');
            this.props.iterateTrialIndex();
            this.props.history.push("/break");
        }
        if(this.state.dataAry==null) this.createDataAry();

    }
    createDataAry(){
        const {baseCorr, controlCorr} = this.state;
        let corrAry = [baseCorr, controlCorr];
        corrAry = _.shuffle(corrAry);
        let dataAry = corrAry.map(corr=>{
            return generateDataSet(corr);
        });
        this.setState({
            actualAnswer: corrAry[0]>corrAry[1]? 0:1,
            dataAry,
        },()=>console.log('Actual Answer:', this.state.actualAnswer, 'Base Corr:', baseCorr, 'Control Corr:', controlCorr));

    }
    handleKeyboardEvents = event => {
        const key = event.key;
        switch (key) {
            case 'Enter':
                this.handleSubmitAnswer(event);
                break;
            case 'ArrowLeft':
                console.log('ARROWLEFT');
                this.handleLeftChartSelect();
                break;
            case 'ArrowRight':
                this.handleRightChartSelect();
                break;
            default:
                break;
        }
    }
    
    chartSwitcher(dataSet, testType){
        const chartWidth = 380, chartHeight = 380;
        const {classes} = this.props;
        if(dataSet===undefined || dataSet.length===0){
            return <div></div>
        }
        else{
            return <ScatterPlot
            className = {classes.visChart}
            data = {dataSet}
            width = {chartWidth}
            height = {chartHeight}
            handleSelection = {testType==0? this.handleLeftChartSelect:this.handleRightChartSelect}
            >
        </ScatterPlot>
        }
    }

    handleLeftChartSelect(){
        this.setState((prevState)=>({candidateAns:prevState.candidateAns===0?-1:0, selectLeft:!prevState.selectLeft, selectRight:false }),()=>console.log('Select:',this.state.candidateAns));
    }

    handleRightChartSelect(){
        this.setState((prevState)=>({candidateAns:prevState.candidateAns===1?-1:1, selectRight:!prevState.selectRight, selectLeft:false }),()=>console.log('Select:',this.state.candidateAns));
    }

    handleSubmitAnswer = (event)=>{
        const {
            currentTrialIndex,
            actualAnswer,
            candidateAns,
            trailStartTime,
            delta,
            currentTrialLength,
        } = this.state;
        const {addTrial, expData, trialIndex} = this.props;
        event.preventDefault();
        if(candidateAns===-1){
            this.setState({invalidAnswer:true});
            return;
        }
        this.setState(()=>({
            deltaAry:[...this.state.deltaAry, delta],
            invalidAnswer:false
        }),()=>{
            let res = this.checkVariance();
            let jnd = res['jnd'], fob = res['fob'];
            console.log('RES: ',res, 'JND: ',jnd, 'FOB: ',fob);
            addTrial({
                currentTrialIndex,
                actualAnswer,
                candidateAns,
                trailStartTime,
                trailEndTime: Date.now(),
                jnd,
                fob,
            });
            if(currentTrialIndex === currentTrialLength-1 || res[fob]<0.25) {
                if(trialIndex===expData.length-1) this.props.history.push("/Debrief");
                else{
                    let nextMeta=expData[trialIndex+1];
                    this.setState({
                        currentTrialIndex:0,
                        currentTrialLength:nextMeta['DataSize'],
                        baseCorr:nextMeta['BaseCorr'],
                        controlCorr: nextMeta['BaseCorr']+nextMeta['StartDelta'],
                        delta: nextMeta['StartDelta'],
                        buttonDisabledStatus: true,
                    });
                    this.props.iterateTrialIndex();
                }
            }
            else {
                this.calculateNextCorr();
            }
        });

    }
    checkVariance(){
        const {deltaAry} = this.state;
        let jnd='', fob='';
        if(deltaAry.length<24) return {'jnd':jnd,'fob':fob};
        let len = deltaAry.length;
        let sub1 = deltaAry.slice(len-24,len-16),
            sub2 = deltaAry.slice(len-16,len-8),
            sub3 = deltaAry.slice(len-8,len),
            var1 = math.var(sub1),
            var2 = math.var(sub2),
            var3 = math.var(sub3),
            avg1 = math.mean(sub1),
            avg2 = math.mean(sub2),
            avg3 = math.mean(sub3),
            varAvgSub = math.var([avg1, avg2, avg3]),
            avgVarSub = math.mean([var1, var2, var3]);
        jnd = varAvgSub;
        fob = (varAvgSub/avgVarSub); 
        console.log('Debug in checkVariance');
        console.log('sub1: ',sub1);
        console.log('sub2: ',sub2);
        console.log('sub3: ',sub3);
        console.log('var1: ',var1);
        console.log('var2: ',var2);
        console.log('var3: ',var3);
        console.log('avg1: ',avg1);
        console.log('avg2: ',avg2);
        console.log('avg3: ',avg3);
        console.log('varAvgSub/JND: ',varAvgSub);
        console.log('avgVarSub: ',avgVarSub);
        console.log('FOB: ',fob);
        return {'jnd':jnd,'fob':fob};
    }
    calculateNextCorr(){
        const {actualAnswer, candidateAns, baseCorr, factor, currentTrialIndex, delta, deltaRight, deltaWrong} = this.state;

        let nextDelta;
        if(actualAnswer===candidateAns){
            nextDelta = (delta > minFactor*factor) ? +(delta-factor*deltaRight).toFixed(3):delta;
        }
        else{
            nextDelta = +(delta+factor*deltaWrong).toFixed(3);
        }
        if(baseCorr+factor*nextDelta>=1 || baseCorr+factor*nextDelta<=0) nextDelta = delta;
        this.setState(prevState=>({
            controlCorr:baseCorr+factor*nextDelta, 
            dataAry:null, 
            currentTrialIndex:currentTrialIndex+1, 
            selectLeft:false,selectRight:false, 
            delta:nextDelta, 
            candidateAns:-1
        }));
        this.setState({trailStartTime: Date.now()});
    }

    render(){
        const {dataAry, selectLeft, selectRight, invalidAnswer, currentTrialIndex,currentTrialLength} = this.state;
        const {classes} = this.props;
        if(dataAry === null || dataAry.length===0 || dataAry[0]===undefined || dataAry[0].length===0 || dataAry[1]===undefined || dataAry[1].length==0){
            console.log("Data Generating");
            return <div></div>
        }
        const chartAry = dataAry.map((d,i)=>{
            return this.chartSwitcher(d,i);
        })
        
        return (
            <div>
                <Header title="Questions" />
                <div className={classes.container}>
                    <MobileStepper
                            variant="progress"
                            steps={currentTrialLength}
                            position="static"
                            activeStep={currentTrialIndex+1}
                            className={classes.root}
                            backButton={
                                <div>Progress {currentTrialIndex+1} / {currentTrialLength}</div>
                            }
                        />

                    <div style = {{'display':'flex', 'flexFlow':'row nowrap', 'justifyContent':'center'}} >
                        <div data-tip data-for="tooltipLeft">
                            {chartAry[0]}
                            <ReactTooltip id='tooltipLeft'><span>Select Left!</span></ReactTooltip>
                            <p className = {selectLeft?classes.chartSelect:classes.selectHidden} >Selected!</p>
                        </div>
                        <div data-tip data-for="tooltipRight"> 
                            {chartAry[1]}
                            <ReactTooltip id='tooltipRight'><span>Select Right!</span></ReactTooltip>
                            <p className = {selectRight?classes.chartSelect:classes.selectHidden}>Selected!</p>
                        </div>
                    </div>
                    <FormControl className={classes.formControl} error={invalidAnswer}>
                        <FormLabel component="legend">Which visualization appears to have higher correlation of? </FormLabel>
                        <Typography>Select the chart and press Enter to move to the next trial. You can either click the buttons (A or B) or use the &larr; or &rarr; keys.</Typography>
                    </FormControl>
                    <div></div>
                    <Button
                        id="submitButton"
                        disabled={this.state.buttonstatus}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmitAnswer}
                    >Next</Button>
                </div>
            </div>       
        );
    }
}
const mapStateToProps = ({ trialIndex, expData }) => {
    return {
        trialIndex,
        expData,
    };
};

export default connect(mapStateToProps,actions)(withStyles(styles)(JNDHit));