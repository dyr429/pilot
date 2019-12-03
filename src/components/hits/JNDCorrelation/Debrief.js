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

import * as actions from "../../../actions";
import Header from '../../Header';
import {time_limit_lowerbound} from '../../../config/jnd_experiment/experimentParameters';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import barchartimg from '../../../imgs/chartsSample/barchart.png'


const styles = theme => ({
    image: {
        height: 60,
        marginLeft:70
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
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'grey',

    // styles we need to apply on draggables
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? 'lightblue' : 'lightgrey',
    padding: grid,
    width: '40%'
});

class Debrief extends Component {
    state = {
        items: getItems(10),
        selected: getItems(5, 10),
        postId: '',
        buttonstatus:true,
        questions: [
            {
                question: 'Your gender:',
                name: "gender",
                type: 'single-choice',
                options: ['Female', 'Male', 'Non-binary/third gender', 'Prefer to self-describe', 'Prefer not to say'],
                optionType: "inline",
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
                question: 'Your country of residence:',
                name: 'country_of_residence',
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
                question: 'Highest degree you have obtained or are pursuing:',
                name: 'education',
                type: 'single-choice',
                options: ['High School', 'Associates', 'Bachelors', 'Masters', 'PhD/MD/JD etc.', 'Other', 'Unspecified'],
                optionType: "inline",
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Do you have any difficulties with reading?',
                name: "reading",
                type: 'single-choice',
                options: ['Yes',  'No'],
                optionType: "inline",
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Please indicate how experienced you are with data visualization concepts and tools. (1 means "I have never used data visualization" and 7 means "I use data visualization in my daily work")',
                name: 'vis_experience',
                type: 'single-choice',
                options: ['1', '2', '3', '4', '5', '6', '7'],
                optionType: "block",
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Please indicate how experienced you are with statistics. (1 means "I have never used statistics" and 7 means "I use and analyze statistics in my daily work"',
                name: 'stat_experience',
                type: 'single-choice',
                options: ['1', '2', '3', '4', '5', '6', '7'],
                optionType: "block",
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Your monitor size is closest to:',
                name: 'screen_size',
                type: 'single-choice',
                options: ['9" or smaller', '11"', '13"', '15"', '17"', '19"', '21"', '24"','27" or larger', 'I\'m not sure.'],
                optionType: "block",
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'What is your professional field:',
                name: 'profession_field',
                type: 'drop-down-menu',
                options: ['Architecture, Planning & Environmental Design', 'Business', 'Communications',
                'Education','Engineering &  Science','Health & Medicine'],
                optionType: "block",
                answer: '',
                required: true,
                emptyAnswer: false,
            },
            {
                question: 'Please rank charts based on your preference',
                options: [{id: "item-0", content: "Bubble Chart",imgPath: require("../../../imgs/chartsSample/bubblechart.png")},
                    {id: "item-1", content: "Bar Chart",imgPath: require("../../../imgs/chartsSample/barchart.png")},
                    {id: "item-2", content: "Pie Chart",imgPath: require("../../../imgs/chartsSample/piechart.png")},
                    {id: "item-3", content: "Stacked Bar Chart",imgPath: require("../../../imgs/chartsSample/stackedbar.png")}],
                name: 'ranking',
                answerName: 'ranking-answer',
                type: 'drag-drop',
                answer: [],
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
            if(q.type=='drag-drop' && q.required === true && q.answer.length===0){
                q.emptyAnswer = true;
                error = true;
                console.log('err')
            }
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


    ///////////////////////////////drag and drop/////////////////////////////


    getList = name => {
        let list=[];
        this.state.questions.map( q => {
            if(name === q.name){
                list = q.options
            }else if(name.substring(0,name.length-7) === q.name){
                list = q.answer
            }
        });
        return list;
    }

    onDragEnd = (result) => {
        //console.log(result);
        const { source, destination} = result;
        if (!destination) {
            return;
        }
        const destListID = result.destination.droppableId;
        const sourceListID = result.source.droppableId;
        // dropped outside the list


        if (sourceListID === destListID) {
            const items = reorder(
                this.getList(source.droppableId),
                source.index,
                destination.index
            );


            this.setState(state => {
                const questions = state.questions.map(q => {

                    if (q.name === destListID) {
                        q.options = items;
                    }else if(destListID.substring(q.name.length-7,q.name.length) === q.name){
                        q.answer = items;
                    }
                    return q;
                });

                return {
                    questions,
                };
            });

        } else {
            const result = move(
                this.getList(source.droppableId),
                this.getList(destination.droppableId),
                source,
                destination
            );


            this.setState(state => {
                const questions = state.questions.map(q => {
                    if (q.name === sourceListID) {
                        q.options = result[sourceListID];
                        q.answer = result[destListID];
                    }
                    return q;
                });

                return {
                    questions,
                };
            });

            this.setState({
                items: result.droppable,
                selected: result.droppable2
            });
        }
    };

    //////////////////////////////////////////////////////////////////////////



    switchQuestionType(question) {
        const { classes } = this.props;
        switch (question.type) {
            case 'single-choice':
                if(question.optionType == "inline")
                    return (<RadioGroup
                        className={classes.radioGroup}
                        value={question.answer}
                        name={question.name}
                        onChange={this.handleSelection}
                    >
                        {question.options.map((option) => {
                            return (<FormControlLabel
                                className={classes.formControlLabel}
                                labelPlacement="top"
                                value={option}
                                control={<Radio color="primary"/>}
                                label={option}
                                key={'single'+option}/>);
                        })}
                    </RadioGroup>);
                else
                    return (<RadioGroup
                        className={classes.radioGroupBlock}
                        value={question.answer}
                        name={question.name}
                        onChange={this.handleSelection}
                    >
                        {question.options.map((option) => {
                            return (<FormControlLabel
                                className={classes.formControlLabel}
                                labelPlacement="top"
                                value={option}
                                control={<Radio color="primary"/>}
                                label={option}
                                key={'single'+option}/>);
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
                        Please select
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
            case 'drag-drop':
                return (
                    <div className={classes.dndRoot}>
                        <DragDropContext onDragEnd={this.onDragEnd}>
                            <Droppable droppableId={question.name}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {question.options.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {item.content}
                                                        <img src={item.imgPath} alt="img" className={classes.image}/>

                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                            <Droppable droppableId={question.name + "_answer"}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}>
                                        {question.answer.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}>
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={getItemStyle(
                                                            snapshot.isDragging,
                                                            provided.draggableProps.style
                                                        )}>
                                                        {index+1}.
                                                        {item.content}
                                                        <img src={item.imgPath} alt="img" className={classes.image}/>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                );

            default:
                break;
        }
    }

    render() {
        const { classes } = this.props;
        const { questions, postId } = this.state;

        return (
            <div>
                <Header title="Submission" />
                <form className={classes.container}>
                    <Typography variant="h5" className={classes.title}>Thank you! Before you submit, please fill out the following demographics form.</Typography>
                    <Divider variant="middle" />
                    {questions.map((question, qIndex) => {
                        return (
                            <FormControl
                                required={question.required}
                                error={question.required && question.emptyAnswer}
                                className={classes.formControl}
                                key={question+qIndex}
                            >
                                <FormLabel className={classes.formLabel} key={question+qIndex+'label'}>{qIndex + 1}. {question.question}</FormLabel>
                                {this.switchQuestionType(question)}
                            </FormControl>
                        );
                    })}

                        <Typography variant="head5">A code for Mechanical Turk will display below after you submit successfully.</Typography>
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

const mapStateToProps = ({trialIndex }) => {
    return {
        trialIndex
    };
};

export default connect(mapStateToProps, actions)(withStyles(styles)(Debrief));
