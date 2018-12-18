import axios from 'axios';
import {
    COURSE_ADD_USER,
    COURSE_CREATE,
} from "./types";

export const courseAddUser = (token, studentEmail, course) => dispatch => {
    axios
        .post('/api/courses/addUser', {token, studentEmail, course})
            .then(res =>
                dispatch({
                    type: COURSE_ADD_USER
                })
        );
};

export const courseCreate = (token, courseName) => dispatch => {
    axios
        .post('/api/courses/create', {token, courseName})
            .then(res =>
                dispatch({
                    type: COURSE_CREATE
                }))
            .catch(res => {
                dispatch({
                    type: COURSE_CREATE
                })
            }
        );
};
