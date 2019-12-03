import React, { Component } from "react";
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Header from '../../Header';
import { withStyles } from '@material-ui/core/styles';
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
});

class Break extends Component {

    constructor(props){
        super(props);

    }

    handleSubmitAnswer = (event)=>{
        this.props.history.push("/hit");
    }

    render(){
        const {classes} = this.props;
        return(
            <div>
                <Header title="Break" />
                <div>
                    <p>
                        You can take a rest or click 'Next' to continue.
                    </p>
                </div>
                <Button
                        id="submitButton"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={this.handleSubmitAnswer}
                    >Next</Button>
            </div>
        );
    }
}
export default withStyles(styles)(Break);