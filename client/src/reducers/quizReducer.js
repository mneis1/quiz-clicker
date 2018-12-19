import {
    GET_QUESTIONS,
    QUIZ_ANSWER,
    QUIZ_CREATE,
    QUIZ_CREATE_FAILED
} from "../actions/types";

const initialState = {
    quiz: null,
    questions: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            console.log(JSON.stringify(action.payload));
            return {
                ...state,
                questions: action.payload
            };
        case QUIZ_CREATE:
            return {
                ...state,
                quiz: action.payload
            };
        case QUIZ_ANSWER:
        case QUIZ_CREATE_FAILED:
        default:
            return {
                ...state
            };
    }
}