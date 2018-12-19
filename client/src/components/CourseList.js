import {Button, Container, ListGroup, ListGroupItem} from "reactstrap";
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {getCourses} from '../actions/courseActions'
import {getQuestions} from "../actions/quizActions";

class CourseList extends Component {

    crap=[{_id: 1, name:"fuck"}, {_id: 2, name:"shit"}];

    componentDidMount() {
        this.props.getCourses(this.props.token);
    }

    render () {
        if (this.props.courses)
            console.log(JSON.stringify(this.props.courses));

        if (!this.props.courses)
            return (<div/>);

        console.log("Rendering");
        return (
            <Container>
                    <ListGroup>
                        {this.props.courses.map(({name, quiz}) => (
                            <ListGroupItem disabled={!quiz}>
                                {name} <Button disabled={!quiz}>Click me</Button>
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
