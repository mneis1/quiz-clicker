import React, {Component} from 'react';

import {connect} from 'react-redux';

import {verifyStudent, verifyTeacher} from '../actions/userActions';
import {Container} from "reactstrap";
import {Redirect} from "react-router";
import StudentView from "./StudentView";
import {Button} from 'reactstrap';
import QuizCreateForm from "./QuizCreateForm";

class TeacherView extends Component{



    state = {
        redirect: false,
        teacher: false,
        showCreateQuiz: false
    };

    onClick = () => {
        if (!this.state.showCreateQuiz) {
            this.state.showCreateQuiz = true;
        }else if (this.state.showCreateQuiz){
            this.state.showCreateQuiz = false;
        }
    };


    render() {

        const createQuizForm = (this.state.showCreateQuiz) ? <QuizCreateForm/> : <div/>;

        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        if (!this.props.teacher) {
            return <div/>
        }


        return (
            <Container>
                <div>
                    {createQuizForm}
                    <Button color="dark" size="lg" onClick={this.onClick}>
                        Create Quiz
                    </Button>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.users.token,
    teacher: state.users.teacher
});

export default connect(mapStateToProps)(TeacherView);