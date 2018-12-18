import Cookies from 'universal-cookie';
import {GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, ADD_USER_EXISTS, USER_LOGIN, USER_LOGIN_FAIL} from "../actions/types";

const cookies = new Cookies();

const initialState = {
    registerSuccess: null,
    loginSuccess: null,
    userExists: null
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
        case USERS_LOADING:
            return {
                ...state
            };
        case USER_LOGIN:
            // Store return (jwt) in cookies for future use
            cookies.set('clickEase', action.payload.token, {path: '/'});

            // No reason to return the token again if it's being stored in the cookie.
            return {
                ...state,
                loginSuccess: true
            };
        case USER_LOGIN_FAIL:
            console.log(action.payload);

            return {
                ...state
            };
        default:
            return state;
    }
}