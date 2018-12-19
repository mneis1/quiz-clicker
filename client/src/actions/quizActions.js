import axios from 'axios';
import {
    QUIZ_CREATE,
    QUIZ_CREATE_FAILED,
    QUIZ_ANSWER,
    GET_QUESTIONS
} from "./types";

export const getQuestions = (quizId) => dispatch => {
    console.log("dsadasdsadsa " );
    axios
        .post('/api/quiz/questions', {quizId})
        .then(res =>
            dispatch({
                type: GET_QUESTIONS,
                payload: res.data
            }))
        .catch(res =>
            dispatch({
                type: GET_QUESTIONS
            }))
};

export const createQuiz = (quizJson) => dispatch => {
    axios
        .post('/api/quiz/create', {quizJson})
        .then(res =>
            dispatch({
                type: QUIZ_CREATE,
                payload: res.data
            }))
        .catch(res =>
            dispatch({
                type: QUIZ_CREATE_FAILED
            }))
};

export const answerQuestion = (token, questionId, answer) => dispatch => {
    axios
        .post('/api/quiz/answer', {token, questionId, answer})
        .then(res =>
            dispatch({
                type: QUIZ_ANSWER
            }))
        .catch(res =>
            dispatch({
                type: QUIZ_ANSWER
            }))
};
