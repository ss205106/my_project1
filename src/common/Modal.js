import React from 'react';
import styled from "styled-components"
import Button from './Button';
const FullScreenDiv = styled.div`
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.25);
    display: flex;
    justify-content: center;
    align-items: center;
`
const ModalDiv = styled.div`
    width: 320px;
    background: white;
    padding: 1.5rem;
    box-shadow: 0px 0px 8px rgba(0,0,0,0.125);
    h2{
        margin-top:0;
        margin-bottom: 1rem;
    }
    p{
        margin-bottom:3rem;
    }
    .buttons{
        display:flex;
        justify-content: flex-end;
    }

`
//버튼컴포넌트 스타일에서 조금만 추가하기
const StyledBtn = styled(Button)`
    height: 2rem;
    &+&{
        margin-left: 0.75rem;
    }
`
const Modal = (props) => {
    const {visible,
        post,
        description,
        confirmText,
        cancelText,
        onConfirm,
        onCancel} = props
    return (
        <FullScreenDiv>
           <ModalDiv>
                <h2>{ post.title}</h2>
                <p>정말 삭제하시겠습니까?</p>
                <div className='buttons'>
                    <StyledBtn onClick={onConfirm}>확인</StyledBtn>
                    <StyledBtn onClick={onCancel}>취소</StyledBtn>
                </div>
            </ModalDiv> 
        </FullScreenDiv>
    );
};

export default Modal;