import React, {Component} from 'react';

import {connect} from 'react-redux';

class QuizCreateForm extends Component{

    state = {
        data: [{Question: "", Choice1: "", Choice2: "", Choice3: "", CorrectAnswer: ""}],
    }

    addQuestion = (e) =>{
        this.setState((prevState) => ({
            data: [...prevState.data, {Question: "", Choice1: "", Choice2: "", Choice3: "", CorrectAnswer: ""}],
        }));
    }

    submitQuiz = (e) => {
        const dataJSON = JSON.stringify(this.state.data);
        console.log(dataJSON)
    }

    handleSubmit = (e) => {
        e.preventDefault()
    }
    render() {
        let {data} = this.state;

        return(
                <form onSubmit={this.handleSubmit}>
                    <button onClick={this.addQuestion}>Add new question</button>
                    {
                        data.map((val, idx) => {
                            let questionId = `question-${idx}`, choice1Id = `choice1-${idx}`, choice2Id = `choice2-${idx}`, choice3Id = `choice3-${idx}`, correctChoiceId = `correctChoice-${idx}`;
                            return(
                                <div key={idx}>
                                    <label htmlFor={questionId}>{`Question #${idx + 1}`}</label>
                                    <input type="text" name={questionId} data-id={idx} id={questionId}/>
                                    <label htmlFor={choice1Id}>{`Choice 1`}</label>
                                    <input type="text" name={choice1Id} data-id={idx} id={choice1Id}/>
                                    <label htmlFor={choice2Id}>{`Choice 2`}</label>
                                    <input type="text" name={choice2Id} data-id={idx} id={choice2Id}/>
                                    <label htmlFor={choice3Id}>{`Choice 3`}</label>
                                    <input type="text" name={choice3Id} data-id={idx} id={choice3Id}/>
                                    <label htmlFor={correctChoiceId}>{`Correct choice`}</label>
                                    <input type="text" name={correctChoiceId} data-id={idx} id={correctChoiceId}/>
                                </div>
                            );
                        })
                    }
                    <input type="submit" value="Submit" onClick={this.submitQuiz}/>
                </form>
        );
    }


}

export default connect()(QuizCreateForm);