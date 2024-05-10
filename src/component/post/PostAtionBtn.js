import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import palette from '../../common/Pallete';
const PostActionDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
;`
const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  color: ${palette.Red[3]};
  font-weight: bold;
  border: none;
  outline: none;
  font-size: 0.875rem;
  cursor: pointer;
  &:hover {
    background: ${palette.Orange[1]};
    color: ${palette.Orange[7]};
  }
  & + & {
    margin-left: 0.25rem;
  }
;`
const PostAtionBtn = (props) => {
  const {onEdit,onRemoveClick} = props
  
    return (
        <PostActionDiv>
        <ActionButton onClick={onEdit}>수정</ActionButton>
         <ActionButton onClick={onRemoveClick}>삭제</ActionButton>
       </PostActionDiv>
    );
};

export default PostAtionBtn;