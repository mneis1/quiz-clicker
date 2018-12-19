import {
    COURSE_ADD_USER,
    COURSE_CREATE,
    COURSE_FIND,
    COURSE_FIND_TEACHING
} from "../actions/types";

const initialState = {
    courses: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case COURSE_FIND:
        case COURSE_FIND_TEACHING:
            return {
                ...state,
                courses: action.payload
            };
        case COURSE_ADD_USER:
        case COURSE_CREATE:
        default:
            return {
                ...state
            };
    }
}