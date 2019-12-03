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
    chartImg:{
      width: 700,
        display: "inline-block"
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

        margin: theme.spacing.unit,
        marginBottom: theme.spacing.unit * 4,
        maxWidth: 1000,

    },
    radioFormControl:{
        maxWidth:400,
        marginTop:90,
        marginLeft: 20
    },
    formControlLabel: {
        fontSize: 20,
    },
    radioGroup: {

    },

    answerField: {
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

class VLAT extends Component {
    state = {
        postId: '',
        buttonstatus:true,
        currentIndex: 0,
        questions: [
            {
                question: 'What was the price of a barrel of oil in February 2015',
                img:  require("../../imgs/VLAT/VLAT1.png"),
                name: "0",
                options: ["$57.36","$47.82","$50.24","$39.72","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'In which month was the price of a barrel of oil the lowest in 2015?',
                img:  require("../../imgs/VLAT/VLAT1.png"),
                name: "1",
                options: ["March","May","July","December","Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: 'What was the price range of a barrel of oil in 2015?',
                img: require("../../imgs/VLAT/VLAT1.png"),
                name: "2",
                options: ["$35 - $65","$48.36 - $60.95","$37.04 - $48.36","$37.04 - $60.95","Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: 'Over the course of the second half of 2015, the price of a barrel of oil was',
                img: require("../../imgs/VLAT/VLAT1.png"),
                name: "3",
                options: ["rising","falling","staying","Skip"],
                trueAnswer: 1,
                answer: '',
                required: true,
            },
            {
                question: 'Over the course of the second half of 2015, the price of a barrel of oil was',
                img: require("../../imgs/VLAT/VLAT1.png"),
                name: "4",
                options: ["rising","falling","staying","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'What is the average internet speed in Japan?',
                img: require("../../imgs/VLAT/VLAT2.png"),
                name: "5",
                options: ["10 Mbps","14 Mbps","15 Mbps","16 Mbps","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'In which country is the average internet speed the fastest in Asia?',
                img: require("../../imgs/VLAT/VLAT2.png"),
                name: "6",
                options: ["China","Hong Kong","South Korea","Vietnam","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'What is the range of the average internet speed in Asia?',
                img: require("../../imgs/VLAT/VLAT2.png"),
                name: "7",
                options: ["0 - 22 Mbps"," 2 - 20.5 Mbps","3 - 20 Mbps","3.4 - 7.8 Mbps","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'How many countries in Asia is the average internet speed slower than Thailand?',
                img: require("../../imgs/VLAT/VLAT2.png"),
                name: "8",
                options: ["5 Countries"," 6 Countries","7 Countries","8 Countries","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'What is the cost of peanuts in Las Vegas?',
                img: require("../../imgs/VLAT/VLAT3.png"),
                name: "9",
                options: ["$12"," $16.7","$23.4","$35.4","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'About what is the ratio of the cost of a sandwich to the total cost of room service in Seattle?',
                img: require("../../imgs/VLAT/VLAT3.png"),
                name: "10",
                options: ["1 to 10","2 to 10","4 to 10","6 to 10","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'In which city is the cost of soda the highest?',
                img: require("../../imgs/VLAT/VLAT3.png"),
                name: "11",
                options: ["New York City","Las Vegas","Atlanta","Washington D.C.","Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: 'What is the cost range of a sandwich in the cities?',
                img: require("../../imgs/VLAT/VLAT3.png"),
                name: "12",
                options: ["$0 - $24.2","$0 - $55.9","$13 - $24.2","$17 - $35.2","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'The cost of vodka in Atlanta is higher than that of Honolulu',
                img: require("../../imgs/VLAT/VLAT3.png"),
                name: "13",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'The ratio of the cost of Soda to the cost of Water in Orlando is higher than that of Washington D.C.',
                img: require("../../imgs/VLAT/VLAT3.png"),
                name: "14",
                options: ["True","False","Skip"],
                trueAnswer: 1,
                answer: '',
                required: true,
            },
            {
                question: 'What is the approval rating of Republicans among the people who have the education level of Postgraduate Study?',
                img: require("../../imgs/VLAT/VLAT4.png"),
                name: "15",
                options: ["38%","47%","53%","62%","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'What is the education level of people in which the Democrats have the lowest approval rating?',
                img: require("../../imgs/VLAT/VLAT4.png"),
                name: "16",
                options: ["High School Graduate or Less","Some College Degree","College Graduate","Postgraduate study","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'The approval rating of Republicans for the people who have the education level of Some College Degree is lower than that for the people who have the education level of Postgraduate Study.',
                img: require("../../imgs/VLAT/VLAT4.png"),
                name: "17",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'About what is the global smartphone market share of Samsung?',
                img: require("../../imgs/VLAT/VLAT5.png"),
                name: "18",
                options: ["15%","25%","33%","50","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'In which company is the global smartphone market share the smallest?',
                img: require("../../imgs/VLAT/VLAT5.png"),
                name: "19",
                options: ["Apple","Xiaomi","Lenovo","Others","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'The global smartphone market share of Apple is larger than that of Huawei.',
                img: require("../../imgs/VLAT/VLAT5.png"),
                name: "20",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'How many people have rated the taxi between 4.0 and 4.2?',
                img: require("../../imgs/VLAT/VLAT6.png"),
                name: "21",
                options: ["145","153","200","240","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'What is the rating that the people have rated the taxi the most?',
                img: require("../../imgs/VLAT/VLAT6.png"),
                name: "22",
                options: ["4.2-4.4","4.4-4.6","4.6-4.8","4.8-5.0","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'The distribution of the taxi passenger rating is generally skewed to the left.',
                img: require("../../imgs/VLAT/VLAT6.png"),
                name: "23",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'More people have rated the taxi between 4.6 and 4.8 than between 4.2 and 4.4.',
                img: require("../../imgs/VLAT/VLAT6.png"),
                name: "24",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'How many people have rated the taxi 4.9?',
                img: require("../../imgs/VLAT/VLAT6.png"),
                name: "25",
                options: ["200","240","345","Cannot be inferred","Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: 'What is the weight for the person who is 165.1 cm tall?',
                img: require("../../imgs/VLAT/VLAT7.png"),
                name: "26",
                options: ["53.9kg","67.7kg","70.5kg","82.7kg","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'What is the height for the tallest person among the 85 males?',
                img: require("../../imgs/VLAT/VLAT7.png"),
                name: "27",
                options: ["175.3cm","192cm","197.1cm","200cm","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'What is the range in weight for the 85 males?',
                img: require("../../imgs/VLAT/VLAT7.png"),
                name: "28",
                options: ["40 - 130kg","62.3 - 90.9kg","53.9 - 102.3kg","53.9 - 123.6kg","Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: 'About the height for the 85 males is normally distributed.',
                img: require("../../imgs/VLAT/VLAT7.png"),
                name: "29",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'What is the height for the heaviest person among the 85 males?',
                img: require("../../imgs/VLAT/VLAT7.png"),
                name: "30",
                options: ["167.4cm","175.3cm","193cm","197.1cm","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'A group of males are gathered around the height of 176 cm and the weight of 70 kg.',
                img: require("../../imgs/VLAT/VLAT7.png"),
                name: "31",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'There is a negative linear relationship between the height and the weight of the 85 males.',
                img: require("../../imgs/VLAT/VLAT7.png"),
                name: "32",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'The weights for males with the height of 188 cm are all the same.',
                img: require("../../imgs/VLAT/VLAT7.png"),
                name: "33",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'What was the average price of a pound of coffee beans in September 2013?',
                img: require("../../imgs/VLAT/VLAT8.png"),
                name: "34",
                options: ["$4.9","$5.0","$5.1","$5.2","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'When was the average price of a pound of coffee beans at minimum?',
                img: require("../../imgs/VLAT/VLAT8.png"),
                name: "35",
                options: ["April 2013","September 2013","June 2014","December 2014","Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: 'What was the range of the average price of a pound of coffee beans between January 2013 and December 2014?',
                img: require("../../imgs/VLAT/VLAT8.png"),
                name: "36",
                options: ["$4.4 - $6.2","$4.6 - $5.9","$4.6 - $6.0","$4.6 - $6.1","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'Over the course of 2013, the average price of a pound of coffee beans was',
                img: require("../../imgs/VLAT/VLAT8.png"),
                name: "37",
                options: ["rising","falling","staying","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'For how many months was the average price of a pound of coffee beans cheaper than that in December 2013?',
                img: require("../../imgs/VLAT/VLAT8.png"),
                name: "38",
                options: ["3 months","4 months","5 months","6 months","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'What was the number of girls named \'Amelia\' in 2010 in the UK?',
                img: require("../../imgs/VLAT/VLAT9.png"),
                name: "39",
                options: ["1500","3800","4200","8000","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'About what was the ratio of the number of girls named \'Olivia\' to those named \'Isla\' in 2014 in the UK?',
                img: require("../../imgs/VLAT/VLAT9.png"),
                name: "40",
                options: ["1 to 1","1 to 2","1 to 3","1 to 4","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'Over the course of years between 2009 and 2014, when was the number of girls named \'Amelia\' at the maximum?',
                img: require("../../imgs/VLAT/VLAT9.png"),
                name: "41",
                options: ["2009","2011","2012","2014","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'Over the course of years between 2009 and 2014, what was the range of the number of girls named \'Olivia\'?',
                img: require("../../imgs/VLAT/VLAT9.png"),
                name: "42",
                options: ["1200 - 4700","1200 - 8700","1800 - 4000","3000 - 8700","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: ' The number of girls named \'Isla\' was __________ from 2009 to 2012.',
                img: require("../../imgs/VLAT/VLAT9.png"),
                name: "43",
                options: ["rising","falling","staying","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: ' In the UK, the number of girls named \'Amelia\' in 2014 was more than it was in 2013.',
                img: require("../../imgs/VLAT/VLAT9.png"),
                name: "44",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: ' Over the course of years between 2009 and 2014, the number of girls named \'Isla\' was always more than \'Olivia\'.',
                img: require("../../imgs/VLAT/VLAT9.png"),
                name: "45",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: ' What is the total length of the metro system in Beijing?',
                img: require("../../imgs/VLAT/VLAT10.png"),
                name: "46",
                options: ["330km","400km","530km","560km","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: ' Which city\'s metro system has the largest number of stations?',
                img: require("../../imgs/VLAT/VLAT10.png"),
                name: "47",
                options: ["Seoul","Beijing","New York City","Shanghai","Skip"],
                answer: '',
                trueAnswer: 2,
                required: true,
            },
            {
                question: 'What is the range of the total length of the metro systems?',
                img: require("../../imgs/VLAT/VLAT10.png"),
                name: "48",
                options: ["150 - 600 km","240 - 380 km","240 - 560 km","180 - 560 km","Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: ' In general, the number of stations of the metro systems of the world is evenly distributed.',
                img: require("../../imgs/VLAT/VLAT10.png"),
                name: "49",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: ' Which city\'s metro system has the largest number of stations?',
                img: require("../../imgs/VLAT/VLAT10.png"),
                name: "50",
                options: ["Tokyo","New York City","Beijing","London","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: ' A group of the metro systems of the world has approximately 300 stations and around a 200 km system length.',
                img: require("../../imgs/VLAT/VLAT10.png"),
                name: "51",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: ' In general, the ridership of the metro system increases as the number of stations increases.',
                img: require("../../imgs/VLAT/VLAT10.png"),
                name: "52",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'The metro system in Shanghai has more ridership than the metro system in Beijing.',
                img: require("../../imgs/VLAT/VLAT10.png"),
                name: "53",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: 'What was the unemployment rate for Indiana (IN) in 2015?',
                img: require("../../imgs/VLAT/VLAT11.png"),
                name: "54",
                options: ["1.0 - 2.0%","2.0 - 3.0%","3.0 - 4.0%","4.0 - 5.0%",,"Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: 'In which state was the unemployment rate the highest in 2015?',
                img: require("../../imgs/VLAT/VLAT11.png"),
                name: "55",
                options: ["Alaska (AK)","New Mexico (NM)","Florida (FL)","New York (NY)",,"Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'In 2015, the unemployment rate for Washington (WA) was higher than that of Wisconsin (WI).',
                img: require("../../imgs/VLAT/VLAT11.png"),
                name: "56",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 0,
                required: true,
            },
            {
                question: 'For which website was the number of unique visitors the largest in 2010?',
                img: require("../../imgs/VLAT/VLAT12.png"),
                name: "57",
                options: ["Facebook","Amazon","Bing","Google","Skip"],
                answer: '',
                trueAnswer: 3,
                required: true,
            },
            {
                question: 'The number of unique visitors for Amazon was more than that of Yahoo in 2010.',
                img: require("../../imgs/VLAT/VLAT12.png"),
                name: "58",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
            },
            {
                question: ' Samsung is nested in the Financial category',
                img: require("../../imgs/VLAT/VLAT12.png"),
                name: "59",
                options: ["True","False","Skip"],
                answer: '',
                trueAnswer: 1,
                required: true,
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

    }

    handleNext = (event) =>{
        if(this.state.questions[this.state.currentIndex].answer!==''){
            this.setState( state =>{
                let currentIndex = state.currentIndex+1
                return{
                    currentIndex,
                }
            })
        }else{
            alert("please make a selection")
        }

    }


    handleSelection = (event) => {
        const qindex = +event.target.name;
        const value = +event.target.value;
        this.setState( state =>{
            let q = [...state.questions]
            q[qindex].answer = value;
            return{
                q,
            }
        })
    }

    render() {
        const { classes } = this.props;
        const { questions,currentIndex,answers, postId } = this.state;
        const question = questions[currentIndex]
        return (
            <div>
                <Header title="Visualization Literacy Assessment Test" />
                <form className={classes.container}>
                    <Typography variant="h5" className={classes.title}>{question.question}</Typography>
                    <Divider variant="middle" />
                    <img src={question.img} alt="img" className={classes.chartImg} />
                    <FormControl className={classes.radioFormControl}>
                        <RadioGroup
                            className={classes.radioGroup}
                            value={question.answer}
                            name={question.name}
                            onChange={this.handleSelection}
                        >
                            {question.options.map((option,index) => {
                                return (<FormControlLabel
                                    className={classes.formControlLabel}
                                    labelPlacement="right"
                                    value={index}
                                    control={<Radio color="primary"/>}
                                    label={<Typography className={classes.formControlLabel}>{option}</Typography>}
                                    key={'single'+option}/>);
                            })}
                        </RadioGroup>
                    </FormControl>

                    <Button
                        disabled={this.state.buttonstatus}
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleNext}
                    >Next</Button>

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

export default connect(mapStateToProps, actions)(withStyles(styles)(VLAT));
