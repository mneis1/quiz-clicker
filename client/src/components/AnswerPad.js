import React, {Component} from 'react';
import {Button, Container, ListGroup, ListGroupItem} from "reactstrap";
import {connect} from 'react-redux';
import {getQuestions} from "../actions/quizActions";

class AnswerPad extends Component {


    render () {

        if (this.props.questions) {
            console.log("FUCK");
            console.log(JSON.stringify(this.props.questions));

            return (
                <Container>
                    <ListGroup>
                        {this.props.questions.map(({_id, question}) => (
                            <ListGroupItem>
                                {question} <Button outline color="danger" onClick={this.onClick}>Click me</Button>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Container>
            );
        }

        console.log(`token ${this.props.token}`);
        console.log("dsadasdsa");

        return (<Container>
            <div/>
        </Container>)
    }
}

const mapStateToProps = (state) => ({
    token: state.mode.token,
    questions: state.quizzes.questions
});

export default connect(mapStateToProps, {getQuestions})(AnswerPad);
