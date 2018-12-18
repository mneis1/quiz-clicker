import { combineReducers } from "redux";
import userReducer from './userReducer';
import toggleModeReducer from "./toggleModeReducer";

export default combineReducers({
    users: userReducer,
    mode: toggleModeReducer
})