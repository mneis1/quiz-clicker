import React, {Component} from 'react';

import {connect} from 'react-redux';

class QuizCreateForm extends Component{

    state = {
        quizName: "",
        quizTime: "",
        data: [{Question: "", Choice1: "", Choice2: "", Choice3: "", CorrectAnswer: ""}],
    }

    addQuestion = (e) =>{
        this.setState((prevState) => ({
            data: [...prevState.data, {Question: "", Choice1: "", Choice2: "", Choice3: "", CorrectAnswer: ""}],
        }));
    }

    handleSubmit = (e) => {
        const dataJSON = JSON.stringify(this.state);
        console.log(dataJSON)
        e.preventDefault()
    }

    handleChange = (e) => {
        if(["Question","Choice1","Choice2","Choice3","CorrectAnswer"].includes(e.target.className)){
            let data = [...this.state.data]
            data[e.target.dataset.id][e.target.className] = e.target.value
            this.setState({data}, () => console.log(this.state.data))
        } else {
            this.setState({[e.target.name]: e.target.value})
        }
    }
    render(){
        let {quizName, quizTime,data} = this.state;

        return(
                <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
                    <label htmlFor="name">Quiz Name: </label>
                    <input type="text" name="quizName" id="quizName" value={quizName}/>
                    <label htmlFor="name">Quiz question time limit: </label>
                    <input type="text" name="quizTime" id="quizTime" value={quizTime}/>
                    <button onClick={this.addQuestion}>Add new question</button>
                    {
                        data.map((val, idx) => {
                            let questionId = `question-${idx}`, choice1Id = `choice1-${idx}`, choice2Id = `choice2-${idx}`, choice3Id = `choice3-${idx}`, correctChoiceId = `correctChoice-${idx}`;
                            return(
                                <div key={idx}>
                                    <label htmlFor={questionId}>{`Question #${idx + 1}`}</label>
                                    <input type="text" name={questionId} data-id={idx} id={questionId} value={data[idx].Question} className="Question"/>
                                    <label htmlFor={choice1Id}>{`Choice 1`}</label>
                                    <input type="text" name={choice1Id} data-id={idx} id={choice1Id} value={data[idx].Choice1} className="Choice1"/>
                                    <label htmlFor={choice2Id}>{`Choice 2`}</label>
                                    <input type="text" name={choice2Id} data-id={idx} id={choice2Id} value={data[idx].Choice2} className="Choice2"/>
                                    <label htmlFor={choice3Id}>{`Choice 3`}</label>
                                    <input type="text" name={choice3Id} data-id={idx} id={choice3Id} value={data[idx].Choice3} className="Choice3"/>
                                    <label htmlFor={correctChoiceId}>{`Correct choice`}</label>
                                    <input type="text" name={correctChoiceId} data-id={idx} id={correctChoiceId} value={data[idx].CorrectAnswer} className="CorrectAnswer"/>
                                </div>
                            );
                        })
                    }
                    <input type="submit" value="Submit"/>
                </form>
        );
    }


}

export default connect()(QuizCreateForm);