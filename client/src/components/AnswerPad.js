import React, {Component} from 'react';
import {Button, Container, Label, ListGroup, ListGroupItem} from "reactstrap";
import {connect} from 'react-redux';
import {answerQuestion, getQuestions} from "../actions/quizActions";

class AnswerPad extends Component {

    state = {
        html: [],
        count: -1,
    };

    async componentDidMount() {

        this.setAllGroupItems();
        console.log("DSFDSFDSFDSFDS");

        setInterval(async () => {
            this.setAllGroupItems()
        }, 5000);
    }


    setAllGroupItems() {
        let returnVal = [];
        console.log("state " + this.state.count + " size: " + this.props.questions.length + " questions: " + JSON.stringify(this.props.questions));


        if (!this.props.questions || this.props.questions.length === 0 ) {
            return
        }
        console.log("REached here");

        if (this.state.count + 1 >= this.props.questions.length) {
            this.setState({...this.state, html: (<Container>
                    <h2> <Label>Quiz Over</Label> </h2>
                </Container>)}, () => {
                return
            });
        }
        console.log("First state for " + this.state.count);
        this.setState({...this.state, count: this.state.count + 1}, () => {
            if (this.state.count  >= this.props.questions.length)
                return;

            console.log("state count: " + this.state.count);
            console.log("questions: " + JSON.stringify(this.props.questions));

            returnVal.push(<Label style={{
                fontsize: "200%",
                fontweight: "bold"
            }}>{this.props.questions[this.state.count].question}</Label>);
            for (let j = 0; j < this.props.questions[this.state.count].choices.length; j++) {
                returnVal.push(<ListGroupItem>{this.props.questions[this.state.count].choices[j]}<Button
                    style={{marginLeft: '20rem'}} onClick={() => {
                        console.log("Clicked w/ count " + this.state.count);
                    this.props.answerQuestion(this.props.token, this.props.questions[this.state.count]._id, j);
                }}>Select</Button></ListGroupItem>)
            }

            console.log("Setting html for " + this.state.count);
            this.setState({...this.state, html: returnVal});
        });
    };


    render () {

        if (this.props.questions) {
            console.log("In render " + this.state.html);

            return (
                <Container>
                    <ListGroup>
                        {this.state.html}
                    </ListGroup>
                </Container>
            );
        } else console.log("No: " + JSON.stringify(this.props.questions));

        return (<Container>
            <div/>
        </Container>)
    }
}

const mapStateToProps = (state) => ({
    token: state.mode.token,
    questions: state.quizzes.questions
});

export default connect(mapStateToProps, {getQuestions, answerQuestion})(AnswerPad);
