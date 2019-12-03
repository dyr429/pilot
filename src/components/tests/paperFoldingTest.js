import React, { Component } from "react";
import { connect } from "react-redux";
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
import Divider from '@material-ui/core/Divider';

import * as actions from "../../actions";
import Header from '../Header';
import {time_limit_lowerbound} from '../../config/jnd_experiment/experimentParameters';


const styles = theme => ({
    image: {
        height: 60,
        marginLeft:70
    },
    answerImg: {
        height:70,
    },
    exampleImg:{
        width: 600,
    },
    dndRoot: {
        display: 'flex',
        justifyContent: 'space-between',
        margin: 10
    },
    container: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 1000,

    },
    formLabel: {
        minWidth:220,
        display: "inline-block",
        backgroundColor: "lightgrey",
        borderRadius: 20,
        padding: 15,
        color: "#3f51b5"
    },
    formControl: {
        display: 'block',
        margin: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 4,
        maxWidth: 1000,
    },
    formControlLabel: {
        marginLeft: 0
    },
    radioGroup: {
        display: 'inline-block',
        marginLeft: theme.spacing.unit * 3,

    },
    radioGroupBlock: {
        display: 'block',
        textAlign: 'center',
        paddingTop: 8
    },
    answerField: {
        marginLeft: theme.spacing.unit * 3,
    },
    outlinedInput: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,

    },
    radio: {
        marginLeft: 0
    },
    title: {
        margin: 10,

    },
    button: {
        marginLeft: "50%",
        marginTop: 15
    }
});

class paperFoldingTest extends Component {
    state = {
        postId: '',
        buttonstatus:true,
        answers: [...Array(20).fill(-1)],
        trueAnswer:[]
    };

    constructor(props) {

        super(props);
    }

    componentDidMount() {
        if(this.state.buttonstatus){
            setTimeout(()=>{
                this.setState({buttonstatus:false});
            }, time_limit_lowerbound);
        }
    }

    componentWillUnmount() {
    }

    componentDidUpdate() {

    }


    handleSelection = (event) => {
        const questionIndex = event.target.name;
        const value = event.target.value;
        this.setState(state => {
           let answers = [...this.state.answers]
            answers[questionIndex] = +value;
            return {
                answers,
            };
        });
    }

    render() {
        const { classes } = this.props;
        const { answers, postId } = this.state;
        return (
            <div>
                <Header title="Paper Folding Test" />
                <form className={classes.container}>
                    <Typography variant="h5" className={classes.title}>Please finish paper folding test</Typography>
                    <Divider variant="middle" />
                    <Typography variant="h6" className={classes.title}>Instruction</Typography>
                    <Typography variant="h7" className={classes.title}>In this test you are to imagine the folding and unfolding of pieces of paper.

                        In each problem in the test there are some figures drawn at the left of a vertical line and there are others drawn at the right of the line.

                        The figures at the left represent a square piece of paper being folded, and the last of these figures has one or two small circles drawn on it to show where the paper has been punched.

                        Each hole is punched through all the thicknesses of paper at that point. One of the five figures at the right of the vertical line shows where the holes will be when the paper is completely unfolded. You are to decide which one of these figures is correct and click the button underneath for that figure.

                        Now try the sample problem below. (In this problem only one hole was punched in the folded paper.)</Typography>

                    <Typography variant="h6" className={classes.title}>Example</Typography>
                    <img src={require("../../imgs/paperFolding/sample.png")} alt="img" className={classes.exampleImg} />
                    <Typography variant="h6" className={classes.title}>Answer:</Typography>
                    <img src={require("../../imgs/paperFolding/sample_answer.png")} alt="img" className={classes.exampleImg} />
                    <Typography variant="h6" className={classes.title}>So C is the correct answer. Now it's your turn</Typography>
                    <Divider variant="middle" />
                    {answers.map((answer, qIndex) => {
                        const qImage = qIndex+1 + ".png"
                        return (
                            <FormControl
                                required="required"
                                error={answer == -1}
                                className={classes.formControl}
                                key={"question"+qIndex}
                            >
                                <FormLabel className={classes.formLabel} key={"question"+qIndex+'label'}>{qIndex + 1}.
                                    <img src={require("../../imgs/paperFolding/"+ qImage)} alt="img" className={classes.image} />
                                </FormLabel>
                                <RadioGroup
                                    className={classes.radioGroup}
                                    value={answer}
                                    name={qIndex}
                                    onChange={this.handleSelection}
                                >
                                    {['a','b','c','d','e'].map((answer,answerIndex) => {
                                        const aImage = qIndex+1 + answer + ".png"
                                        return (
                                            <FormControlLabel
                                            className={classes.formControlLabel}
                                            labelPlacement="top"
                                            value={answerIndex}
                                            control={<Radio color="primary"/>}
                                            label={
                                                <img src={require("../../imgs/paperFolding/" + aImage)}
                                                     alt="img"
                                                     className={classes.answerImg}/>
                                                }
                                            key={'single'+answerIndex}>
                                            </FormControlLabel>
                                        );
                                    })}
                                </RadioGroup>
                            </FormControl>
                        );
                    })}

                    <Button
                        disabled={this.state.buttonstatus}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmission}
                    >Submit</Button>

                </form>
            </div>
        );
    }
}

const mapStateToProps = ({trialIndex }) => {
    return {
        trialIndex
    };
};

export default connect(mapStateToProps, actions)(withStyles(styles)(paperFoldingTest));
