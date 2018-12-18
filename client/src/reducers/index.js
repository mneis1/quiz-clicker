import { combineReducers } from "redux";
import userReducer from './userReducer';
import toggleModeReducer from "./toggleModeReducer";
import courseReducer from "./courseReducer";

export default combineReducers({
    users: userReducer,
    courses: courseReducer,
    mode: toggleModeReducer
})