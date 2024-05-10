import React, { useCallback } from 'react';
import styled from 'styled-components';
import Button from './Button';
import Responsive from './Responsive';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../modules/user';
import { change_field } from '../modules/write';
const HeaderDiv = styled(Responsive)`
    width: 100%;
    background: white;
    box-shadow: 0px 2px 4px rgba(0,0,0,0.08);
    .logo{
        font-size: 1.125rem;
        font-weight: 800;
        letter-spacing: 2px;
    }
    .right{
        display:flex;
        align-items: center;

    }
`
const WrapperDiv = styled.div`
    margin-left:600px;
    width:1100px;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const UserDiv = styled.div`
    font-weight:800;
    margin-right:20px;
`
const Header = () => {
    const { user } = useSelector(state => ({
        user: state.user.user
    }));
    // console.log(user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const onclick = useCallback(()=>{
        if(window.confirm("로그아웃하시겠씁니까?")){
            navigate("/")
            dispatch(logout())
        }
    },[navigate,dispatch])
    const writeClick1 =() =>{
        dispatch(change_field("isEdit",false))
        navigate("/write")
    }
    return (
        <>
        <HeaderDiv>
            <WrapperDiv>
                <Button to={user ? `/${user.username}` : '/'} className="logo">Main</Button>
                <div style={{display:"flex", justiyuCOntent:"center",alignItems:'center'}}>
             { user ?  ( <div className='right'>
                            <UserDiv>{user.username}:</UserDiv>
                            <Button onClick={writeClick1}>글작성</Button>
                            <Button to="/" onClick={onclick}>로그아웃</Button>
                        </div> ) :
                    (   
                        <div className='right'>
                            <Button to='/login'>로그인</Button>
                            <Button to='/register'>회원가입</Button>
                        </div>
                      )
                        }
                </div>
            </WrapperDiv>
        </HeaderDiv>
        <div style={{height:"4rem"}}></div>
        </>
    );
};

export default Header;