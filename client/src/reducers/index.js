import { combineReducers } from "redux";
import posts from'./postsReducers'
import AuthReducer from "./authReducers";
export default combineReducers({posts,AuthReducer})