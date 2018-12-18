import axios from 'axios';
import {GET_USERS, ADD_USER, DELETE_USER, USERS_LOADING, ADD_USER_EXISTS, USER_LOGIN, USER_LOGIN_FAIL} from "./types";

export const getUsers = () => dispatch => {
    dispatch(setUsersLoading());
    axios
        .get('/api/users')
        .then(res =>
            dispatch({
                type: GET_USERS,
                payload: res.data
        }));
};

export const deleteUser = (id) => dispatch => {
    axios
        .delete(`/api/users/${id}`)
        .then(res =>
        dispatch({
            type: DELETE_USER,
            payload: id
        }));
};

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

export const setUsersLoading = () => {
    return {
        type: USERS_LOADING
    };
};
