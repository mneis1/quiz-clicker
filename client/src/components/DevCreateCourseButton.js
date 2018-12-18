import React, { Component } from 'react';

import {Button} from 'reactstrap';
import {connect} from 'react-redux';

import {courseCreate} from '../actions/courseActions'

class DevCreateCourseButton extends Component {

    onClick = () => {
        this.props.courseCreate(this.props.token, "Test Course");
    };

    render() {
        return (
            <div>
            <Button color="dark" size="lg" onClick={this.onClick}>
                Create Test Course
            </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.mode.token
});

export default connect(mapStateToProps, {courseCreate})(DevCreateCourseButton);
