import React, { useEffect, useState } from 'react';
import Template from '../component/auth/Template';
import From from '../component/auth/From';
import { useDispatch, useSelector } from 'react-redux';
import { change_mode,login } from '../modules/auth';
import { useNavigate } from 'react-router-dom';
import { check } from '../modules/user';
const LoginPage = () => {

    const {form,auth,authError,user,loginLoading ,checkLoading } = useSelector( state => ({
        form:state.authRedux.login,
        auth:state.authRedux.auth,
        authError:state.authRedux.authError,
        user:state.user.user,
        loginLoading:state.loading.loginLoading,
        checkLoading:state.loading.checkLoading
    }))
    
    const [error,setError] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onchange=(e)=>{
        const { name, value } = e.target;
        dispatch(change_mode("login", name, value));
    }

    const onsubmit= (e) =>{
        e.preventDefault()
        setError('')
        const {username,password} = form
        dispatch(login(username,password))
     
    }

    useEffect(() => {
        setError("")
        if (authError){
            console.log(authError)
            setError("로그인 실패")
            return
        }
        if (auth) {
            dispatch(check())  //user에 사용자 이름 등록
        }
    }, [auth,authError,dispatch,setError]);

        useEffect(()=>{
            if(user){
               try{
                localStorage.setItem('user',JSON.stringify(user))
               }catch(e){
                console.log('localStorage is not working')
               }
                navigate(`/${user.username}`)
            }
        },[user,navigate])
             
    if(loginLoading) return <div>loading...</div>
    if(checkLoading) return <div>loading...</div>
    return (
        <Template>
           <From onSubmit={onsubmit} error={error} form={form} onchange={onchange} mode="login" text="로그인"/>
        </Template>
    );
};

export default LoginPage;