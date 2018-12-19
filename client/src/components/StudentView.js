import React, {Component} from 'react';
import ToggleModeButton from "./ToggleModeButton";
import {connect} from 'react-redux';
import TeacherView from './TeacherView';

import {verifyStudent, verifyTeacher} from '../actions/userActions'
import {getCourses} from '../actions/courseActions'
import {Container} from "reactstrap";
import {Redirect} from "react-router";

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
        this.props.getCourses(this.props.token);
    }


    render () {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        if (this.props.courses) {
            console.log("All enrolled courses:");
            for (let i = 0; i < this.props.courses.length; i++) {
                console.log(this.props.courses[i].name);
            }
            console.log("");
            console.log("Courses with active quizzes:");
            for (let i = 0; i < this.props.courses.length; i++) {
                if (this.props.courses[i].quiz) {
                    console.log(this.props.courses[i].name);
                }
            }
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
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token,
    teacher: state.users.teacher,
    courses: state.courses.courses
});

export default connect(mapStateToProps, {verifyStudent, verifyTeacher, getCourses})(StudentView);
