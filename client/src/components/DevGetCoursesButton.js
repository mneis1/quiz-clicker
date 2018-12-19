import React, { Component } from 'react';

import {Button} from 'reactstrap';
import {connect} from 'react-redux';

import {getCourses} from '../actions/courseActions'

class DevGetCoursesButton extends Component {

    onClick = () => {
        this.props.getCourses(this.props.token);
    };

    render() {
        if (this.props.courses) {
            for (let i = 0; i < this.props.courses.length; i++) {
                console.log(this.props.courses[i].name);
            }
        }
        return (
            <div>
            <Button color="dark" size="lg" onClick={this.onClick}>
                Get courses
            </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token,
    courses: state.courses.courses
});

export default connect(mapStateToProps, {getCourses})(DevGetCoursesButton);
