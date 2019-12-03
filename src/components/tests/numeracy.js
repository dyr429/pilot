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

    question: {

    },
    questionHighlight: {
        fontWeight: 'bold',
        display: 'block',
        marginTop: 10
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
        display: "block",
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

    outlinedInput: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,

    },

    title: {
        margin: 10,

    },
    button: {
        marginLeft: "50%",
        marginTop: 15
    }
});

class numeracy extends Component {
    state = {
        postId: '',
        buttonstatus:true,
        score: '',
        questions: [
            //Two-Question Version
            // {
            //     question: 'Out of 1,000 people in a small town 500 are members of a choir. Out of these 500 members in a choir 100 are men. Out of the 500 inhabitants that are not in a choir 300 are men.',
            //     questionHighlight: "What is the probability that a randomly drawn man is a member of the choir? Please indicate the probability in percent. This means that you should not use any commas or dots.",
            //     name: '1',
            //     type: 'text',
            //     inputType: 'text',
            //     answer: '',
            //     required: true,
            //     emptyAnswer: false,
            // },
            // {
            //     question: 'Imagine we are throwing a five-sided die 50 times.',
            //     questionHighlight: "On average, out of these 50 throws how many times would this five-sided die show an odd number (1, 3 or 5)?",
            //     name: '2',
            //     type: 'text',
            //     inputType: 'text',
            //     answer: '',
            //     required: true,
            //     emptyAnswer: false,
            // }
            //One Question Version
            // {
            //     question: 'Imagine we are throwing a five-sided die 50 times.',
            //     questionHighlight: "On average, out of these 50 throws how many times would this five-sided die show an odd number (1, 3 or 5)?",
            //     name: '1',
            //     type: 'text',
            //     inputType: 'text',
            //     answer: '',
            //     required: true,
            //     emptyAnswer: false,
            //     correctAnswer: '30'
            // }
            //5 MIN Version
            {
                question: 'Imagine that we flip a fair coin 1,000 times. ',
                questionHighlight: " What is your best guess about how many times the coin would come up heads in 1000 flips",
                name: '1',
                type: 'text',
                inputType: 'text',
                answer: '',
                required: true,
                emptyAnswer: false,
                correctAnswer: '500'
            },
            {
                question: ' Imagine we are throwing a five-sided die 50 times. ',
                questionHighlight: "  On average, out of these 50 throws how many times would this five-sided die show an odd number (1, 3 or 5)?",
                name: '2',
                type: 'text',
                inputType: 'text',
                answer: '',
                required: true,
                emptyAnswer: false,
                correctAnswer: '30'
            },
            {
                question: 'In the BIG BUCKS LOTTERY, the chance of winning a $10 prize is 1%. ',
                questionHighlight: "  What is your best guess about how many people would win a $10 prize if 1000 people each buy a single ticket to BIG BUCKS",
                name: '3',
                type: 'text',
                inputType: 'text',
                answer: '',
                required: true,
                emptyAnswer: false,
                correctAnswer: '10'
            },
            {
                question: 'In ACME PUBLISHING SWEEPSTAKES, the chance of winning a car is 1 in 1,000. ',
                questionHighlight: "What percent of tickets to ACME PUBLISHING SWEEPSTAKES win a car",
                name: '4',
                type: 'text',
                inputType: 'text',
                answer: '',
                required: true,
                emptyAnswer: false,
                correctAnswer: '0.1'
            },
            {
                question: 'Out of 1000 people in a small town 500 are members of a choir. Out of these 500 members in a choir 100 are men. Out of the 500 inhabitants that are not in a choir 300 are men.',
                questionHighlight: "What is the probability that a randomly? Please indicate the probability in percent",
                name: '5',
                type: 'text',
                inputType: 'text',
                answer: '',
                required: true,
                emptyAnswer: false,
                correctAnswer: '25'
            },
            {
                question: 'In a forest 20% of mushrooms are red, 50% brown and 30% white. A red mushroom is poisonous with a probability of 20%. A mushroom that is not red is poisonous with a probability of 5%',
                questionHighlight: "What is the probability that a poisonous mushroom in the forest is red",
                name: '6',
                type: 'text',
                inputType: 'text',
                answer: '',
                required: true,
                emptyAnswer: false,
                correctAnswer: '50'
            },
            ]

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
        if(this.state.buttonstatus){
            setTimeout(()=>{
                this.setState({buttonstatus:false});
            },time_limit_lowerbound);
        }
    }

    handleSelection = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        if(name==='gender'){
            if(event.target.type==='text') this.setState({genderInput:value});
            else this.setState({genderInput:''});
        }
        this.setState(state => {
            const questions = state.questions.map(q => {
                if (q.name === name) {
                    q.answer = value;
                }
                return q;
            });

            return {
                questions,
            };
        });
    }

    handleSubmission = (event) => {
        const { questions, postId } = this.state;
        const { addTrial } = this.props;

        // Check answer
        let error = false;
        questions.map(q => {
            if(q.required === true && q.answer === '') {
                q.emptyAnswer = true;
                error = true;
                console.log('err')
            }
            console.log(q.answer);
            return q;
        })
        if (error === true) {
            this.setState({
                questions,
            });
            return;
        }

        // Generate postId
        const pId = (+new Date()).toString(36);
        //calculate score
        let score = 0;
        questions.map(q => {
            if(q.answer == q.correctAnswer)
                score++;
        })
        console.log(score)
        this.setState({
            postId: pId,
            score: score,
        });


        // Send back: answers and postId
        const testName = "numeracy"
        addTrial({
            testName,
            questions,
            score,
        });
        //set Local storage
        localStorage.setItem('nextlink', '/paperfolding');
        localStorage.setItem('score', ''+score);
        localStorage.setItem('testname', 'Numeracy Test');
        //redirect
        this.props.history.push(`/result`)
    }


    render() {
        const { classes } = this.props;
        const { questions, postId } = this.state;
        if(postId!=''){
            return(
                <div>
                    <Header title="Numeracy Test" />
                    <form className={classes.container}>
                        <Typography variant="h5">Please finish this numeracy test</Typography>
                        <p></p>
                        <Typography variant="h4">{postId}</Typography>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <Header title="Numeracy Test" />
                <form className={classes.container}>
                    <Typography variant="h4">Please fill out this numeracy test</Typography>
                    {questions.map((question, qIndex) => {
                        return (
                            <FormControl
                                error={question.required && question.emptyAnswer}
                                className={classes.formControl}
                            >
                                <FormLabel className={classes.question}>{qIndex + 1}. {question.question}</FormLabel>
                                <FormLabel className={classes.questionHighlight}>{question.questionHighlight}</FormLabel>
                                <OutlinedInput
                                    className={classes.outlinedInput}
                                    value={question.answer}
                                    name={question.name}
                                    type={question.inputType}
                                    onChange={this.handleSelection}
                                ></OutlinedInput>
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

export default connect(mapStateToProps, actions)(withStyles(styles)(numeracy));
