import { handleActions } from "redux-actions";

const START_LOADING = 'loading/START_LOADING'
const FINISH_LOADING = "loading/FINISH_LOADING"

export const start_loading =(mode) =>({typed:START_LOADING,mode})
export const finish_loading =(mode) =>({typed:FINISH_LOADING,mode})

const initialState = {
    loginLoading: false,
    registerLoading:false,
    checkLoading:false,
    postListLoading:false,
    writeLoading:false,
    postLoading:false,
    postsLoading:false,
    updateLoading:false,
    deleteLoading:false
}

export const loading =handleActions({
    [START_LOADING]: (state,{mode})=>({
        ...state,
        [mode]:true
    }),
    [FINISH_LOADING]: (state,{mode})=>({
        ...state,
        [mode]:false
    })
},initialState)