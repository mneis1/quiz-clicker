import { combineReducers } from "redux";
import userReducer from './userReducer';
import toggleModeReducer from "./toggleModeReducer";
import courseReducer from "./courseReducer";
import quizReducer from "./quizReducer";

export default combineReducers({
    users: userReducer,
    courses: courseReducer,
    quizzes: quizReducer,
    mode: toggleModeReducer
})