import React, { Component } from 'react';

import {Button} from 'reactstrap';
import {connect} from 'react-redux';

import {getQuestions} from "../actions/quizActions";
import {getCourses} from "../actions/courseActions";

class DevButton extends Component {

    componentDidMount() {
        this.props.getCourses(this.props.token);
    }

    onClick = () => {
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
                    this.props.getQuestions(this.props.courses[i].quiz);

                    for (let j = 0; j < this.props.questions.length; j++) {
                        console.log(this.props.questions[j].question)
                    }

                    console.log("")
                }
            }
        }
    };

    render() {
        return (
            <div>
            <Button color="dark" size="lg" onClick={this.onClick}>
                Get Quiz Data
            </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.mode.token,
    courses: state.courses.courses,
    questions: state.quizzes.questions
});

export default connect(mapStateToProps, {getCourses, getQuestions})(DevButton);
