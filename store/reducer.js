import { combineReducers } from "redux";
import postSlice from "./slices/postSlice";
// import postSlice from "./slices/postSlice";
import userSlice from "./slices/userSlice";
import navigationSlice from './slices/navigationSlice'
import chatSlice from "./slices/chatSlice";

export default combineReducers({
    userSlice:userSlice,
    postSlice:postSlice,
    navigationSlice:navigationSlice,
    chatSlice:chatSlice,
})