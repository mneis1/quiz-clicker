import React, {Component} from 'react';
import ToggleModeButton from "./ToggleModeButton";
import {connect} from 'react-redux';

import {verifyStudent, verifyTeacher} from '../actions/userActions'
import {getCourses} from '../actions/courseActions'
import {Container} from "reactstrap";
import {Redirect} from "react-router";
import {getQuestions} from "../actions/quizActions";
import DevButton from "./DevButton";

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
            <DevButton/>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token,
    teacher: state.users.teacher,
    courses: state.courses.courses,
    questions: state.quizzes.questions
});

export default connect(mapStateToProps, {verifyStudent, verifyTeacher, getCourses, getQuestions})(StudentView);
