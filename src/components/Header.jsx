import React, { Component } from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Header extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { title } = this.props;

        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="primary">
                        {title}
                        </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {

};
export default Header;