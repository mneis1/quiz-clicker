import React, {Component} from 'react';

import {connect} from 'react-redux';

import {Container} from "reactstrap";
import {Redirect} from "react-router";
import StudentView from "./StudentView";
import Button from "reactstrap/src/Button";

class TeacherView extends Component{

    state = {
        redirect: false,
        teacher: false,
        showCreateQuiz: false
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
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }

        if (!this.props.teacher) {
            return <div/>
        }

        if(this.state.showCreateQuiz){

        }


        return (
            <Container>
                <div>
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