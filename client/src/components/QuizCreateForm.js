import React, {Component} from 'react';

import {connect} from 'react-redux';

class QuizCreateForm extends Component{

    state = {
        quizName: "",
        quizTime: "",
        data: [{Question: "", choices:["","","",""], CorrectAnswer: 4}],
    }

    addQuestion = (e) =>{
        this.setState((prevState) => ({
            data: [...prevState.data, {Question: "", choices:["","","",""], CorrectAnswer: 4}],
        }));
    }

    handleSubmit = (e) => {
        const dataJSON = JSON.stringify(this.state);
        console.log(dataJSON)
        e.preventDefault()
    }

    handleChange = (e) => {
        if(["Question","Choice","CorrectAnswer"].includes(e.target.className)){
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
                    <div>
                        <label htmlFor="name">Quiz Name: </label>
                        <input type="text" name="quizName" id="quizName" value={quizName}/>
                    </div>
                    <div>
                        <label htmlFor="name">Quiz question time limit: </label>
                        <input type="text" name="quizTime" id="quizTime" value={quizTime}/>
                    </div>

                    <button onClick={this.addQuestion}>Add new question</button>
                    {
                        data.map((val, idx) => {
                            let questionId = `question-${idx}`, choice1Id = `${idx}`, choice2Id = `${idx}`, choice3Id = `${idx}`, correctChoiceId = `correctChoice-${idx}`;
                            return(
                                <div key={idx}>
                                    <div>
                                        <label htmlFor={questionId}>{`Question #${idx + 1}`}</label>
                                        <input type="text" name={questionId} data-id={idx} id={questionId} value={data[idx].Question} className="Question"/>
                                    </div>
                                    <div>
                                        <label htmlFor={choice1Id}>{`Choice 1`}</label>
                                        <input type="text" name={choice1Id} data-id={idx} id={choice1Id} value={data[idx].choices[1]} className="choices[1]"/>
                                    </div>
                                    <div>
                                        <label htmlFor={choice2Id}>{`Choice 2`}</label>
                                        <input type="text" name={choice2Id} data-id={idx} id={choice2Id} value={data[idx].choices[2]} className="choices[2]"/>
                                    </div>

                                    <div>
                                        <label htmlFor={choice3Id}>{`Choice 3`}</label>
                                        <input type="text" name={choice3Id} data-id={idx} id={choice3Id} value={data[idx].choices[3]} className="choices[3]"/>
                                    </div>

                                    <div>
                                        <label htmlFor={correctChoiceId}>{`Correct choice`}</label>
                                        <input type="text" name={correctChoiceId} data-id={idx} id={correctChoiceId} value={data[idx].choices[4]} className="choices[4]"/>
                                    </div>

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