import {
    COURSE_ADD_USER,
    COURSE_CREATE,
} from "../actions/types";

const initialState = {
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
        default:
            return state;
    }
}