import {
    COURSE_ADD_USER,
    COURSE_CREATE,
    COURSE_FIND,
    COURSE_FIND_TEACHING, QUIZ_CREATE, QUIZ_CREATE_FAILED
} from "../actions/types";

const initialState = {
    quiz: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case QUIZ_CREATE:
            return {
                ...state,
                quiz: action.payload
            };
        case QUIZ_CREATE_FAILED:
        default:
            return {
                ...state
            };
    }
}