import Cookies from 'universal-cookie';
import {GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, ADD_USER_EXISTS, USER_LOGIN, USER_LOGIN_FAIL} from "../actions/types";

const cookies = new Cookies();

const initialState = {
    users: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.payload)
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case ADD_USER_EXISTS:
            console.log("hola");
            console.log(action.payload);
            return {
                ...state
            };
        case USERS_LOADING:
            return {
                ...state,
                loading: true
            };
        case USER_LOGIN:
            // Store return (jwt) in cookies for future use
            cookies.set('clickEase', action.payload.token, {path: '/'});

            // No reason to return the token again if it's being stored in the cookie.
            return {
                ...state
            };
        case USER_LOGIN_FAIL:
            console.log(action.payload);

            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
}