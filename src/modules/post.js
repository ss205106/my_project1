import { handleActions } from "redux-actions";
import * as api from "./api/post"
import { start_loading,finish_loading } from "./loding";

const POST_LOADING = 'postLoading'
const POST_SUCCSESS = "post/POST_SUCCSESS"
const POST_FALURE = "post/POST_FALURE"
export const getPost = (id) => async dispatch =>{

    start_loading(POST_LOADING) //loding true로 
   
    try{
        console.log(id)
        const response = await api.read(id) //api auth에있는거 참고
        console.log(response)
        dispatch({type:POST_SUCCSESS,payload:response.data}) //data 보내주고 에러는 null
    
    }catch(error){
        dispatch({type:POST_FALURE,payload:error}) //error는 의미를 잘모르겠고 하라는대로 하는거 쓰임없음
        
    }finally{
        finish_loading(POST_LOADING)
        return;
    }
}

const UPDATE_LODING = 'updateLoading'
const UPDATE_SUCCSESS = "post/UPDATE_SUCCSESS"
const UPDATE_FALURE = 'post/UPDATE_FALURE'
export const update_post = (id,title,body,tags) => async dispath=>{
    console.log(id,title,body,tags)
start_loading(UPDATE_LODING)
            try{
                
                const response = await api.update(id,title,body,tags)
                console.log(response)
                dispath({type:UPDATE_SUCCSESS,payload:response})
            }catch(error){
                dispath({type:UPDATE_FALURE,payload:error})
            }finally{
                finish_loading(POST_LOADING)
                return;
            }
}

const DELETE = 'deleteLoading'
const DELETE_SUCCESS = "post/DELETE_SUCCESS"
const DELETE_FALURE = 'post/DELETE_FALURE'
export const delete_post = (id) => async dispath=>{
  
start_loading(DELETE)
            try{
                await api.remove(id)
                // console.log(response)
            }catch(error){
                console.log(error)
                // dispath({type:UPDATE_FALURE,payload:error})
            }finally{
                finish_loading(DELETE_FALURE)
                return;
            }
}

const initialState = {
   post:{ 
    title:'',
    body:'',
    tags:[]
},
postError:null

}
export const postRedux = handleActions({
    [POST_SUCCSESS]:(state,{payload:post})=>({
        ...state,post,postError:null
    }),
    [POST_FALURE]:(state,{payload:postError})=>({
        ...state,postError
    })
},initialState)