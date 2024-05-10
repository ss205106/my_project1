import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import palette from '../../common/Pallete';
import styled from 'styled-components';
import Button from '../../common/Button';
import {reset_form } from '../../modules/auth';
import { useDispatch,  } from 'react-redux';
const FormDiv = styled.div`
    h3{
        margin: 0;
        color: ${palette.Gray[8]};
        margin-bottom: 1rem;
    }
`
const InputStyle = styled.input`
    font-size: 1rem;
    border: none;
    border-bottom: 1px solid ${ palette.Gray[5] };
    padding-bottom: 0.5rem;
    outline: none;
    width: 100%;

    &:focus{
        color:${palette.Teal[7]};
        border-bottom: 1px solid ${palette.Gray[7]};
    }

    &+&{
        margin-top: 1rem;
    }
`

const ButtonStyle= styled(Button)`
    margin-top: 1rem;
 
`

const FooterDiv = styled.div`
    margin-top: 2rem;
    text-align: right;
    
    a{
        color:${palette.Gray[6]};
        text-decoration: underline;

        &:hover{
            color:${palette.Gray[9]};
        }
    }
` 
const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    font-size: 0.875rem;
    margin-top: 1rem;
    `


const From = (props) => {
    const {mode,text,form,error} = props
    const {onchange,onSubmit} = props
    const dispatch = useDispatch();

   
    useEffect(()=>{
        dispatch(reset_form(mode))
        console.log(mode)
    },[dispatch,mode])

    return (
        <FormDiv>
            <h3>{text}</h3>
            <form onSubmit={onSubmit}>
                <InputStyle value={form.username}  onChange={onchange} autoComplete="username" name="username" placeholder='아이디'/>
                <InputStyle value={form.password} onChange={onchange} autoComplete="password" name="password" placeholder='비밀번호'/>
                {mode === "register" &&  
                <InputStyle value={form.passwordConfirm} onChange={onchange}  autoComplete="passwordConfirm" name="passwordConfirm" placeholder='비밀번호확인'/>}
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <ButtonStyle fullWidth type="submit">{text}</ButtonStyle>
            </form>
            <FooterDiv>
                {mode === "login" ? (<Link to="/register" >회원가입</Link>)
                :(<Link to="/login" >로그인</Link>)}
            </FooterDiv>
        </FormDiv>
    );
};

export default From;