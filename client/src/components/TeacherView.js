import React, {Component} from 'react';
import ToggleModeButton from "./ToggleModeButton";
import {connect} from 'react-redux';

import {verifyStudent, verifyTeacher} from '../actions/userActions'
import {Container} from "reactstrap";
import {Redirect} from "react-router";
import DevCreateCourseButton from "./DevCreateCourseButton";

class TeacherView extends Component {

    state = {
        redirect: false,
        teacher: false
    };

    componentDidMount() {
        this.props.verifyStudent(this.props.token);
        this.props.verifyTeacher(this.props.token);
    }


    render () {
        if (this.props.redirect) {
            return <Redirect to="/"/>
        }

        // Can't redirect but just show nothing.
        // Make sure to protect what it is shown via backend
        if (!this.props.teacher) {
            return <div/>
        }

        return(
            <Container>
                <DevCreateCourseButton/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token,
    teacher: state.users.teacher
});

export default connect(mapStateToProps, {verifyStudent, verifyTeacher})(TeacherView);
