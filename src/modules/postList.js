import { handleActions } from "redux-actions";
import * as api from "./api/post"; // 포스트 관련 API 함수들을 가져옵니다.
import { finish_loading, start_loading } from "./loding";

// 액션 타입 정의
const FETCH_POSTS_LOADING = "postListLoading";
const FETCH_POSTS_SUCCESS = "postList/FETCH_POSTS_SUCCESS";
const FETCH_POSTS_FAILURE = "postList/FETCH_POSTS_FAILURE";

// 액션 생성 함수
export const list = (page,username) => async (dispatch) => {
    start_loading(FETCH_POSTS_LOADING)
    try {
        
        const response = await api.list_post(page,username); // 포스트를 가져오는 API 호출
        // console.log(Number(response.headers['last-page']));
        dispatch({ type: FETCH_POSTS_SUCCESS,payload:response });
    } catch (error) {
        dispatch({ type: FETCH_POSTS_FAILURE, payload: error });
    } finally {
        finish_loading(FETCH_POSTS_LOADING);
    }
};

// 초기 상태 정의
const initialState = {
    posts: null,
    postsError: null,
    lastPage:null
};

// 리듀서 함수 정의
export const postList = handleActions(
    {
        [FETCH_POSTS_LOADING]: (state) => ({
            ...state,
            loading: true,
            error: null,
        }),
        [FETCH_POSTS_SUCCESS]: (state, {payload:response}) => ({
            ...state,
            posts: response.data,
            lastPage:Number(response.headers['last-page']),
            postsError: null,
        }),
        [FETCH_POSTS_FAILURE]: (state, {payload:error}) => ({
            ...state,
            posts:null,
            postsError:error
        }),
    },
    initialState
);