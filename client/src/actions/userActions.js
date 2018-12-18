import axios from 'axios';
import {
    ADD_USER,
    ADD_USER_EXISTS,
    USER_LOGIN,
    USER_LOGIN_FAIL,
    TOGGLE_MODE,
    VALID_STUDENT,
    INVALID_STUDENT,
    LOGOUT
} from "./types";

export const login = (user) => dispatch => {
    axios
        .post('/api/users/', user)
        .then(res =>
            dispatch({
                type: USER_LOGIN,
                payload: res.data
            }))
        .catch(res =>
            dispatch({
                type: USER_LOGIN_FAIL,
                payload: res.data
            })
        );
};

export const register = (regObj) => dispatch => {
    axios
        .post('/api/register', regObj)
        .then(res =>
            dispatch({
                type: ADD_USER,
                payload: res.data
            })
        ).catch(res =>
            dispatch({
                type: ADD_USER_EXISTS,
                payload: res.data
            })
        );
};

export const verifyStudent = (token) => dispatch => {
    axios
        .post('/api/users/isStudent', {token})
        .then(res =>
            dispatch({
                type: VALID_STUDENT
            })
        ).catch(res =>
            dispatch({
                type: INVALID_STUDENT
            })
    );
};

export const toggleMode = (token) => dispatch => {
    axios
        .post('/api/users/isTeacher', {token})
        .then(res =>
            dispatch({
                type: TOGGLE_MODE,
            })
        ).catch(res =>
            dispatch({
                type: null,
            })
    );
};

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    })
}
