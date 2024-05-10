import { handleActions } from "redux-actions";
import * as api from "./api/post"; // 포스트 관련 API 함수들을 가져옵니다.
import { finish_loading, start_loading } from "./loding";

// 액션 타입 정의
const RESET_WRITE = "write/RESET_WRITE"
const WIRTE_LOADING = "writeLoading";
const WIRTE_SUCCESS = "write/WIRTE_SUCCESS";
const WIRTE_FALUTE = "write/WIRTE_FALUTE";
const CHANGE_FIELD = "write/CHANGE_FIELD" //auth랑 똑같은 방식
// 액션 생성 함수
export const change_field = (key,value) => ({type:CHANGE_FIELD,key,value})//quill에서 받아오는 값 스테이트에 넣어주는 함수 
export const reset_write = () => ({type:RESET_WRITE}) // 스테이트에 있는 값 리셋해주기
export const write= (title,body,tags) => async (dispatch) => {
  
   start_loading(WIRTE_LOADING)
    try {
        const response = await api.write_post(title,body,tags); // 포스트를 가져오는 API 호출
        console.log(response)
        dispatch({ type: WIRTE_SUCCESS, payload: response });
    } catch (error) {
        dispatch({ type: WIRTE_FALUTE, payload: error });
    } finally {
       finish_loading(WIRTE_LOADING)
    }
};

// 초기 상태 정의
const initialState = {
    title:'',
    body:'',
    tags:[],
    writer:null,
    wirwriterError:null,
    isEdit:false
};

// 리듀서 함수 정의
export const writeRedux = handleActions(
    {
        [CHANGE_FIELD]: (state,{key,value})=>{
            return{
                ...state,
                [key]:value
            }
        },
        [RESET_WRITE]:(state,aciton)=>({
            
            ...state,title:'',
            body:'',
            tags:[],
            writer:null,
            wirwriterError:null,
        }),
        [WIRTE_SUCCESS]:(state,{payload:writer})=>({
            ...state,writer,wirwriterError:null
        }),
        [WIRTE_FALUTE]:(state,{payload:wirwriterError})=>({
            ...state,
            writer:null,
            wirwriterError
        })
    },
    initialState
);