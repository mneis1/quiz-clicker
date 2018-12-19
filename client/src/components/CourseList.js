import {Button, Container, Label, ListGroup, ListGroupItem} from "reactstrap";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {getCourses} from '../actions/courseActions'
import {getQuestions} from "../actions/quizActions";
import AnswerPad from "./AnswerPad";

class CourseList extends Component {

    componentDidMount() {
        this.props.getCourses(this.props.token);
        this.setState({answerPad: false})
    }

    returnToNormal = () => {
      this.setState({answerPad: false})
    };

    render () {

        if (!this.props.courses)
            return (<div/>);

        if (this.state && this.state.answerPad)
            return (<Container>
                <AnswerPad/>
            <Button onClick={this.returnToNormal}>Go Back</Button>
            </Container>);


        return (
            <Container>
                    <h1><Label>Courses</Label></h1>
                    <ListGroup>
                        {this.props.courses.map(({name, quiz}) => (
                            <ListGroupItem disabled={!quiz}>
                                {name} <Button onClick={() => {
                                this.props.getQuestions(quiz);
                                this.setState({answerPad: true})

                            }} disabled={!quiz} style={{marginLeft: '20rem'}}>Quiz</Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    token: state.mode.token,
    courses: state.courses.courses,
    questions: state.quizzes.questions
});


export default connect(mapStateToProps, {getCourses, getQuestions})(CourseList);
