import { handleActions } from "redux-actions"
import {start_loading,finish_loading} from './loding'
import * as api from './api/auth'

//액션타입
const CHANGE_MODE = "auth/CHANG_MODE"
const RESET_FORM = "auth/RESET_FORM"

//액션함수
//fomr 은 "register" 냐 "login"이냐 
// key ? username,password,passwordConfim
// vlaue?실제값 (username , password,passwordConfim)
export const change_mode = (form, key, value) =>({type:CHANGE_MODE,form,key,value})
export const reset_form = (form) =>({type:RESET_FORM,form})


const REGISTER_LOADING ="registerLoading" //loding리덕스에서 보내줄 값
const REGISTER_SUCCSESS ="auth/REGISTER_SUCCSESS"
const REGISTER_FALURE ="auth/REGISTER_FALURE"

export const regiser =(username,password) => async dispath =>{
    start_loading(REGISTER_LOADING) //loding true로 
    try{
        const response = await api.register(username,password) //api auth에있는거 참고
        
        dispath({type:REGISTER_SUCCSESS,payload:response.data}) //data 보내주고 에러는 null
        console.log(response.data)
    }catch(error){
        dispath({type:REGISTER_FALURE,payload:error}) //error는 의미를 잘모르겠고 하라는대로 하는거 쓰임없음

    }finally{
        finish_loading(REGISTER_LOADING)
        return;
    }
}

const LOGIN = 'loginLoading'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE'

export const login = (username,password) => async dispatch =>{
    start_loading(LOGIN)  //바꿔야함
    
    try{
        const response = await api.login(username,password)
        dispatch({type:LOGIN_SUCCESS, payload: response.data})
    }catch(error){
        dispatch({type:LOGIN_FAILURE, payload: error})
    }finally{
        finish_loading(LOGIN)
        return;
    }
}
//스테이트값
const initialState = {
    login:{
        username:'',
        password:''
    },
    register:{
        username:'',
        password:'',
        passwordConfirm:''
    },
    auth:null, //response.data
    authError: null //웹상에서 날라오는 err
}

export const authRedux = handleActions({
    [CHANGE_MODE] : (state, {form, key, value}) => {  //체인지 함수 
        
        return{ 
        ...state,
        [form]:{
            ...state[form],
            [key]:value
        },
    }
    },
    [RESET_FORM]: (state,{form}) => ({  //인풋 값 리셋해주는 함수 
      ...state,
      [form]:initialState[form],
      auth:null,
      authError:null
    }),//  auth = payload.data
    [REGISTER_SUCCSESS]:(state,{payload:auth}) => ({
        ...state,auth,
        authError:null
    }),
    [REGISTER_FALURE]:(state,{payload:authError}) => ({
        ...state,
        auth:null,
        authError
    }),
     [LOGIN_SUCCESS]: (state, {payload: auth})=>({
         ...state,
         auth,
         authError:null
     }),
     [LOGIN_FAILURE]: (state, {payload: authError}) =>({
        ...state,
        auth:null,
        authError
     })
},initialState)