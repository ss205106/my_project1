import React from 'react';
import styled from 'styled-components';
import Button from '../../common/Button';
// import { useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

const ActionBtnDiv = styled.div` 
    margin-top:1rem;
    margin-bottom: 3rem;
    button + button{
        margin-left: 0.5rem;
    }
` 
const StyleBtn = styled(Button)`
    height: 2.125rem;
    &+&{
        margin-left: 0.5rem;
    }
`

const WriteActionBtn = (props) => {
    // const nevigat=useNavigate()
    const {writeClick,onCancel,isEdit} = props
    console.log(isEdit)
    //isEdit 참이면 수정 
    return (
        <ActionBtnDiv>
        <StyleBtn Cyan onClick={writeClick}>
            포스트 {isEdit ? "수정" : "등록"}
        </StyleBtn>
        <StyleBtn onClick={onCancel}>
            취소
        </StyleBtn>
    </ActionBtnDiv>
    );
};

export default WriteActionBtn;