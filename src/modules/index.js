import { combineReducers } from "redux";
import { authRedux } from "./auth";
import { loading } from "./loding";
import {user} from "./user"
import { postList } from "./postList";
import { writeRedux } from "./write";
import { postRedux } from "./post";
export const rootReducer = combineReducers({
    authRedux,loading,user,postList,writeRedux,postRedux
}) 

