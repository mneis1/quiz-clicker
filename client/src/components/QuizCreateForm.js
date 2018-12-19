import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Container} from "reactstrap/src";

class QuizCreateForm extends Component{

    state = {
        question: null,
        choice1: null,
        choice2: null,
        choice3: null,
        correctChoice: null
    }

    sendUp = () => {

    }

    render() {
        return(
            <Container>
                <input type="text" name="Question: "/>
                <input type="text" name="Choice 1: "/>
                <input type="text" name="Choice 2: "/>
                <input type="text" name="Choice 3: "/>
                <input type="text" name="Correct Choice: "/>
            </Container>
        );
    }


}