import React, { Component } from 'react';

import {Button} from 'reactstrap';
import {connect} from 'react-redux';

import {toggleMode} from '../actions/userActions'

class ToggleModeButton extends Component {

    onClick = () => {
        this.props.toggleMode(this.props.token);
    };

    render() {
        return (
            <div>
            <Button color="dark" size="lg" onClick={this.onClick}>
                Switch to {this.props.nextMode} mode
            </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    mode: state.mode.teacherMode ? "teacher" : "student",
    nextMode: state.mode.teacherMode ? "student" : "teacher",
    token: state.mode.token
});

export default connect(mapStateToProps, {toggleMode})(ToggleModeButton);
