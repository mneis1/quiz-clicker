import React, {Component} from 'react';

import {connect} from 'react-redux';

import {verifyStudent, verifyTeacher} from '../actions/userActions'
import {Container} from "reactstrap";
import {Redirect} from "react-router";
import {Button} from 'reactstrap';
import QuizCreateForm from './QuizCreateForm';

class TeacherView extends Component{

    state = {
        redirect: false,
        teacher: false,
        showCreateQuiz: true
    };

    componentDidMount() {
        this.props.verifyStudent(this.props.token);
        this.props.verifyTeacher(this.props.token);
    }

    onClick = () => {
        if (!this.state.showCreateQuiz) {
            this.state.showCreateQuiz = true;
        }else if (this.state.showCreateQuiz){
            this.state.showCreateQuiz = false;
        }
    };


    render() {

        this.quizForm = <div/>

        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        // Can't redirect but just show nothing.
        // Make sure to protect what it is shown via backend
        if (!this.props.teacher) {
            return <div/>
        }

        if(this.state.showCreateQuiz){
            this.quizForm = <QuizCreateForm/>
        }


        return (
            <Container>
                <div>
                    {this.quizForm}
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

export default connect(mapStateToProps, {verifyStudent, verifyTeacher})(TeacherView);
