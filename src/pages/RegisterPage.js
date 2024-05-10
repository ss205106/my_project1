import React, { useEffect, useState } from 'react';
import Template from '../component/auth/Template';
import From from '../component/auth/From';
import { useDispatch, useSelector } from 'react-redux';
import { change_mode,regiser } from '../modules/auth';
import { check } from '../modules/user';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const {form,auth,authError,user,registerLoading ,checkLoading } = useSelector( state => ({
        form:state.authRedux.register,
        auth:state.authRedux.auth,
        authError:state.authRedux.authError,
        user:state.user.user,
        registerLoading:state.loading.registerLoading,
        checkLoading:state.loading.checkLoading
    }))
    const [error,setError] = useState(null)
    // console.log(registerLoading,authError,auth,form)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onsubmit =(e)=>{
        e.preventDefault()
        const {username,password,passwordConfirm} = form
        setError("")
        if(password !== passwordConfirm){   
            setError("비밀번호가 틀립니다")
            dispatch(change_mode('register',password,''))
            dispatch(change_mode('register',passwordConfirm,''))
            return
        }
        if([username,password,passwordConfirm].includes('')){
            setError('빈칸이 있습니다')
            return
        }
        // console.log(username)
        dispatch(regiser(username,password))
      
    }
    
    const onchange=(e)=>{
        const { name, value } = e.target;
        dispatch(change_mode("register", name, value));
    }
    
    useEffect(() => {
        
        if (authError) {
            if (authError.response) {
                if (authError.response.status === 400) {
                    setError("3자리 이상으로 입력");
                    return;
                }
                if (authError.response.status === 409) {
                    setError("이미 존재하는 아이디입니다");
                    return;
                }
            }
            // 에러가 발생한 경우여도 응답이 없을 수 있으므로, 이 경우를 처리합니다.
            setError("에러가 발생했습니다");
            return;
        }
        if (auth) {
            console.log(auth)
            dispatch(check())  //user에 사용자 이름 등록 
        }
    }, [auth,dispatch,authError]);
    
      useEffect(()=>{
        if(user){
            try{
                localStorage.setItem('user',JSON.stringify(user))
               }catch(e){
                console.log('localStorage is not working')
               }
                navigate('/')
        }
        },[user,navigate])
    if(registerLoading) return <div>loading...</div>
    if(checkLoading) return <div>loading...</div>
    return (
        <Template>
             <From error={error} onSubmit={onsubmit} onchange={onchange} form={form} mode="register" text="회원가입"/>
         </Template>
    );
};

export default RegisterPage;