import axios from 'axios';
import {
   QUIZ_CREATE,
    QUIZ_CREATE_FAILED
} from "./types";

export const create = (quizJson) => dispatch => {
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
