import React, {Component} from 'react';

import {connect} from 'react-redux';

import {verifyStudent, verifyTeacher} from '../actions/userActions'
import {Container} from "reactstrap";
import {Redirect} from "react-router";
import StudentView from "./StudentView";

class TeacherView extends Component{

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

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        return (
            <Container>
                Cool it works!
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    teacher: state.users.teacher
});

export default connect(mapStateToProps, {verifyStudent, verifyTeacher})(TeacherView);