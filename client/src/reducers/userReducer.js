import {
    GET_USERS,
    ADD_USER,
    DELETE_USER,
    ADD_USER_EXISTS,
    USER_LOGIN,
    USER_LOGIN_FAIL,
    VALID_STUDENT,
    INVALID_STUDENT,
    VALID_TEACHER,
    INVALID_TEACHER,
    LOGOUT
} from "../actions/types";

const initialState = {
    registerSuccess: null,
    loginSuccess: null,
    userExists: null,
    token: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state
            };
        case DELETE_USER:
            return {
                ...state,
            };
        case ADD_USER:
            return {
                registerSuccess: true
            };
        case ADD_USER_EXISTS:
            return {
                registerSuccess: false,
                userExists: true
            };
        case USER_LOGIN:
            return {
                ...state,
                token: action.payload.token,
                loginSuccess: true
            };
        case USER_LOGIN_FAIL:
            console.log(action.payload);

            return {
                ...state
            };
        case VALID_STUDENT:
            return {
                ...state
            };
        case INVALID_STUDENT:
            return {
                ...state,
                token: null
            };
        case VALID_TEACHER:
            return {
                ...state,
                teacher: true
            };
        case INVALID_TEACHER:
            return {
                ...state,
                teacher: false
            };
        case LOGOUT:
            console.log("Logout");
            return {
                ...state,
                token: null
            };
        default:
            return state;
    }
}