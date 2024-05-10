import { handleActions } from "redux-actions";
import * as api from "./api/auth"
import { finish_loading,start_loading } from "./loding";

const CHECK_LOADING = "checkLoading"
const CHECK_SUCCSESS ="user/CHECK_SUCCSESS"
const CHECK_FALURE ="user/CHECK_FALURE"
const SET_USER = 'user/SET_USER_TO_LOCALSTORAGE'
const LOGOUT_SUCCESS = "user/LOGOUT_SUCCESS"
const LOGOUT_FALURE = 'user/LOGOUT_FALURE'

export const set_user =(user) => ({type:SET_USER,user})
function checkFailue (){
    try{
        localStorage.removeItem('user')
    }catch(e){
        console.log(e)
    }
}

export const check =() => async dispath =>{

    start_loading(CHECK_LOADING) //loding true로 
    
    try{
        const response = await api.check() //api auth에있는거 참고
        
        dispath({type:CHECK_SUCCSESS,payload:response.data})
    }catch(error){
        dispath({type:CHECK_FALURE,payload:error}); //error는 의미를 잘모르겠고 하라는대로 하는거 쓰임없음
        checkFailue();
    }finally{
        finish_loading(CHECK_LOADING)
        return;
    }
 
}


export const logout = () => async dispath => {
    try{
        await api.logout()
        dispath({type:LOGOUT_SUCCESS})
        checkFailue()
    }catch(error){
       console.log(error)
    }
}

const initialState = {
    user: null,
    checkError:null
}

export const user = handleActions({
    [SET_USER]:(state,{user}) =>({
        ...state,
        user,
        checkError:null
    }),
    [CHECK_SUCCSESS]:(state,{payload:user}) => ({
        ...state,
        user,
        checkError:null
    }),
    [CHECK_FALURE]:(state,{payload:checkError}) => ({
        ...state,
        user:null,
        checkError
    }),
    [LOGOUT_SUCCESS] : (state,action)=>({
        ...state,user:null,
        checkError:null
    }),
    [LOGOUT_FALURE] : (state,aciton)=>({
        ...state,
    })
},initialState)

