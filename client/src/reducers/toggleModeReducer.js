import {USER_LOGIN, TOGGLE_MODE} from "../actions/types";

// If teacherMode is false then student mode is assumed
const initialState = {
    teacherMode: false,
    token: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                token: action.payload.token
            };
        case TOGGLE_MODE:
            return {
                ...state,
                teacherMode: !state.teacherMode
            };
        default:
            return state;
    }
}