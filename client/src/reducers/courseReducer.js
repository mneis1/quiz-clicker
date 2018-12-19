import {
    COURSE_ADD_USER,
    COURSE_CREATE,
    COURSE_FIND
} from "../actions/types";

const initialState = {
    courses: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case COURSE_ADD_USER:
            return {
                ...state,
            };
        case COURSE_CREATE:
            return {
                ...state,
            };
        case COURSE_FIND:
            console.log("Courses JSON?");
            console.log(JSON.stringify(action.payload));
            return {
                ...state,
                courses: action.payload
            };
        default:
            return {
                ...state
            };
    }
}