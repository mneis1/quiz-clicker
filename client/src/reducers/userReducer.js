import {GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, ADD_USER_EXISTS, USER_LOGIN} from "../actions/types";

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
            console.log(action.payload);

            return {
                ...state,
                users: action.payload
            };
        default:
            return state;
    }
}