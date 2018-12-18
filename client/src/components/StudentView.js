import React, {Component} from 'react';
import ToggleModeButton from "./ToggleModeButton";
import {connect} from 'react-redux';
import TeacherView from './TeacherView';

import {verifyStudent, verifyTeacher} from '../actions/userActions'
import {Container} from "reactstrap";
import {Redirect} from "react-router";

class StudentView extends Component {

    state = {
        redirect: false,
        teacher: false
    };

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
            <TeacherView/>
            {
                this.props.teacher ?
                <ToggleModeButton/>
                    :
                <div/>
            }
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token,
    teacher: state.users.teacher
});

export default connect(mapStateToProps, {verifyStudent, verifyTeacher})(StudentView);
