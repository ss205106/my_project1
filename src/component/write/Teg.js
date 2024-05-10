import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import palette from '../../common/Pallete';
const TagDiv = styled.div`
    width: 100%;
    margin-left:20px;
    border-top: 1px solid ${palette.Indigo[2]};
    padding-top: 2rem;
    h4{
        color: ${palette.Indigo[8]};
        margin-top:0;
        margin-bottom:0.5rem;
    }
`
const TagForm = styled.form`
    border-radius: 4px;
    overflow: hidden;
    display: flex;
    width: 256px;
    border: 1px solid ${palette.Indigo[9]};

    input,
    button{
        outline: none;
        border: none;
        font-size: 1rem;
    }

    input{
        padding: 0.5rem;
        flex: 1;
        min-width: 0;
    }

    button{
        cursor: pointer;
        padding-right: 1rem;
        padding-left: 1rem;
        border: none;
        background: ${palette.Indigo[8]};
        color: white;
        font-weight: bold;
        &:hover{
            background:${palette.Indigo[6]};
        }
    }
`
const TagListUL = styled.ul`
    display:flex;
    list-style-type: none;
    margin-top:0.5rem;
    li{
        margin-right:20px;
        margin-left:20px;
    }
`
const Xbtn = styled.button`
    color: red;
    border: none;
    background: white;
    &:hover {
        cursor: pointer;
        background: #ccc;
    }
`
const Teg = (props) => {
    const {tags,isEdit,post} = props
    const {change_field}= props
    const [input,setInput] = useState('')
    // const [tagList,setTagList] = useState([])
    // setTagList(tags)
    // console.log(tagList)
    // const [tagList,setTagList] = useState([])
    useEffect(() => {
        if (isEdit && post.tags) {
            change_field("tags", post.tags);
        } else {
            change_field("tags", []);
        }
    }, [isEdit, post, change_field]);

    const onsubmit =useCallback((e) => {
        e.preventDefault()
        if(!input) return
        if(tags.includes(input)){
            return;
        }else{
            const newTagList = [...tags,input]
            // setTagList(newTagList)
            change_field("tags",newTagList)
            
            setInput('')
        }
        
        setInput('')
    },[tags,input,setInput,change_field])
    
    const onChange = (e) => {
        setInput(e.target.value)
    }

    const onclick = (e) =>{
        const remove = tags.filter(item => item !==e.target.id)
        change_field("tags",remove)
    }

    return (
        <TagDiv>
        <h4>태그</h4>
        <TagForm onSubmit={onsubmit}>
            <input  value={input} onChange={onChange} placeholder='태그를 입력하세요'/>
            <button type="submit">추가</button>
        </TagForm>
        <TagListUL>
           { tags && tags.map(item => <li> <span style={{color:"blue"}}>#</span>{item}<Xbtn id={item} onClick={onclick}>X</Xbtn></li>)}
        </TagListUL>
    </TagDiv>
    );
};

export default Teg;