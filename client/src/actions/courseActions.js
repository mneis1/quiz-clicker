import axios from 'axios';
import {
    COURSE_ADD_USER,
    COURSE_CREATE,
    COURSE_FIND,
    COURSE_FIND_TEACHING
} from "./types";

export const getCoursesTeaching = (token) => dispatch => {
    axios
        .post('/api/courses/findTeaching', {token})
        .then(res =>
            dispatch({
                type: COURSE_FIND_TEACHING,
                payload: res.data.courses
            }))
        .catch(res =>
            dispatch({
                type: COURSE_FIND_TEACHING
            }))
};
export const getCourses = (token) => dispatch => {
    axios
        .post('/api/courses/find', {token})
        .then(res =>
            dispatch({
                type: COURSE_FIND,
                payload: res.data.courses
            }))
        .catch(res =>
            dispatch({
                type: COURSE_FIND
            }))
};

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
