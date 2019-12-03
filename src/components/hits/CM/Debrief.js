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
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 600,
    },
    formControl: {
        display: 'block',
        margin: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 4,
        maxWidth: 600,
    },
    radioGroup: {
        display: 'inline-block',
        marginLeft: theme.spacing.unit * 3,
    },
    answerField: {
        marginLeft: theme.spacing.unit * 3,
    },
    outlinedInput: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 3,
        labelWidth:100,
    },
});

class Debrief extends Component {
    state = {
        postId: '',
        buttonstatus:true,
        questions: [ // TODO: config.json
            {
                question: 'Your gender:',
                name: "gender",
                type: 'single-choice',
                options: ['Female', 'Male', 'Non-binary/third gender', 'Prefer to self-describe', 'Prefer not to say'],
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Your age:',
                name: 'age',
                type: 'text',
                inputType: 'number',
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Your country of origin:',
                name: 'country_of_origin',
                type: 'drop-down-menu',
                options: ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica", "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
                    , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
                    , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
                    , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
                    , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
                    , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
                    , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
                    , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
                    , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
                    , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia"
                    , "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "United States Minor Outlying Islands", "Uruguay"
                    , "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)", "Yemen", "Zambia", "Zimbabwe"],
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Highest degree obtained:',
                name: 'education',
                type: 'single-choice',
                options: ['High School', 'Associates', 'Bachelors', 'Masters', 'PhD/MD/JD etc.', 'Other', 'Unspecified'],
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Please indicate how experienced you are with data visualization concepts and tools. (1 means "I have never used data visualization" and 7 means "I use data visualization in my daily work")',
                name: 'vis_experience',
                type: 'single-choice',
                options: ['1', '2', '3', '4', '5', '6', '7'],
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Please indicate how experienced you are with statistics. (1 means "I have never used statistics" and 7 means "I use and analyze statistics in my daily work"',
                name: 'stat_experience',
                type: 'single-choice',
                options: ['1', '2', '3', '4', '5', '6', '7'],
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Your monitor size is closest to:',
                name: 'screen_size',
                type: 'single-choice',
                options: ['9" or smaller', '11"', '13"', '15"', '17"', '19"', '21"', '23" or larger', 'I\'m not sure.'],
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Please share anything else you\'d like to tell us here:',
                name: 'additional_comment',
                type: 'paragraph',
                answer: '',
                emptyAnswer: false,
            },
        ],
        genderInput:'',
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
        const { addToSession } = this.props;

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
        this.setState({
            postId: pId,
        });

        // Send back: answers and postId
        const add = {
            postId: pId,
            sessionEndTime: Date.now(),
        };
        questions.map(q => {
            add[q.name] = q.answer;
        });
        addToSession(add);
    }

    switchQuestionType(question) {
        const { classes } = this.props;
        switch (question.type) {
            case 'single-choice':
                return (<RadioGroup
                    className={classes.radioGroup}
                    value={question.answer}
                    name={question.name}
                    onChange={this.handleSelection}
                >
                    {question.options.map((option) => {
                        
                        return (<FormControlLabel
                            className={classes.formControlLabel}
                            labelPlacement="end"
                            value={option==='Prefer to self-describe'?this.state.genderInput===''?'somevalue':this.state.genderInput:option}
                            control={<Radio color="primary" />}
                            label={option} 
                            key={'single_choice'+option}/>
                            );
                            
                    })}
                </RadioGroup>);
            case 'drop-down-menu':
                return (<NativeSelect
                    className={classes.answerField}
                    value={question.answer}
                    onChange={this.handleSelection}
                    name={question.name}
                    input={<Input name={question.name} />}
                >
                    <option value="" className={classes.menuOption} disabled>
                        Please select a country.
                    </option>
                    {question.options.map((option) => {
                        return (
                            <option
                                value={option}
                                className={classes.menuOption}
                                key={'dropdown'+option}
                            >{option}</option>
                        );
                    })}
                </NativeSelect>);
            case 'text':
                return (<OutlinedInput
                    className={classes.outlinedInput}
                    value={question.answer}
                    name={question.name}
                    type={question.inputType}
                    onChange={this.handleSelection}
                ></OutlinedInput>);
            case 'paragraph':
                return (<OutlinedInput
                    className={classes.outlinedInput}
                    value={question.answer}
                    name={question.name}
                    rows="4"
                    multiline
                    fullWidth
                    onChange={this.handleSelection}
                ></OutlinedInput>);
            default:
                break;
        }
    }

    render() {
        const { classes } = this.props;
        const { questions, postId } = this.state;
        if(postId!=''){
            return(
                <div>
                    <Header title="Submission" />
                    <form className={classes.container}>
                    <Typography variant="h5">Thanks for your participation! Below is your code for Mechanical Turk.</Typography>
                    <p></p>
                    <Typography variant="h4">{postId}</Typography>
                    </form>
                </div>
            )
        }
        return (
            <div>
                <Header title="Submission" />
                <form className={classes.container}>
                    <Typography variant="body1">Thank you! Before you submit, please fill out the following demographics form.</Typography>
                    {questions.map((question, qIndex) => {
                        if(question.name==='gender'){
                            return (<div>
                                <FormControl
                                    required={question.required}
                                    error={question.required && question.emptyAnswer}
                                    className={classes.formControl}
                                >
                                    <FormLabel>{qIndex + 1}. {question.question}</FormLabel>
                                    {this.switchQuestionType(question)}
                                    
                                    <OutlinedInput
                                    className={classes.outlinedInput}
                                    value={this.state.genderInput}
                                    name={question.name}
                                    type={'text'}
                                    onChange={this.handleSelection} />
                                    </FormControl>
                                </div>
                            );
                        }
                        return (
                            <FormControl
                                required={question.required}
                                error={question.required && question.emptyAnswer}
                                className={classes.formControl}
                            >
                                <FormLabel>{qIndex + 1}. {question.question}</FormLabel>
                                {this.switchQuestionType(question)}
                            </FormControl>
                        );
                    })}

                    <Typography variant="body1">A code for Mechanical Turk will display below after you submit successfully.</Typography>
                    <Typography variant="h4">{postId}</Typography>

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

const mapStateToProps = ({ data }) => {
    return {
        data
    };
};

export default connect(mapStateToProps, actions)(withStyles(styles)(Debrief));
