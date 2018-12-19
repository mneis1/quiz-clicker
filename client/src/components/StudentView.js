import React, {Component} from 'react';
import ToggleModeButton from "./ToggleModeButton";
import {connect} from 'react-redux';

import {verifyStudent, verifyTeacher} from '../actions/userActions'
import {getCourses} from '../actions/courseActions'
import {Container} from "reactstrap";
import {Redirect} from "react-router";
import DevGetCoursesButton from "./DevGetCoursesButton";

class StudentView extends Component {

    state = {
        redirect: false,
        teacher: false
    };

    componentDidMount() {
        this.props.verifyStudent(this.props.token);
        this.props.verifyTeacher(this.props.token);
        if (!this.props.token) {
            this.setState({redirect: true});
        }
    }


    render () {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        return(
            <Container>
            {
                this.props.teacher ?
               "Teacher"
                   :
               "Student"
            }
            {
                this.props.teacher ?
                <ToggleModeButton/>
                    :
                <div/>
            }
            <DevGetCoursesButton/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token,
    teacher: state.users.teacher
});

export default connect(mapStateToProps, {verifyStudent, verifyTeacher})(StudentView);
