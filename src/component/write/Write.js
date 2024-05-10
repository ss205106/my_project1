import React, { useCallback, useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import styled from 'styled-components';
import Responsive from '../../common/Responsive';

const WriteDiv = styled(Responsive)`
  padding-top: 5rem;
  padding-bottom: 5rem;
`;

const TitleInput = styled.input`
  font-size: 2rem;
  font-weight: bold;
  outline: none;
  padding: 0.5rem 1rem;
  border: 2px solid #ccc;
  border-radius: 5px;
  margin-bottom: 2rem;
  width: 990px;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4CAF50;
  }
`;

const QuillDiv = styled.div`
  .ql-editor {
    min-height: 320px;
    font-size: 1.25rem;
    line-height: 1.5;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 1rem;
    color: #333;
    background-color: #fff;
  }
  .ql-toolbar {
    border: none;
    border-radius: 5px;
    background-color: #f3f3f3;
  }
  .ql-toolbar button:hover {
    background-color: #ddd;
  }
`;

const Write = (props) => {
  //리덕스
  // const {title,body} = props //스테이트 값
  const {change_field,post,isEdit} = props //액션 함수 
  //상수
  const quillElement = useRef(null);
  const quillInstance = useRef(null);
  const [title,setTitle] = useState('')
  console.log(post)
  //uill
  useEffect(() => {
    quillInstance.current = new Quill(quillElement.current, {
      theme: 'snow',
      placeholder: '내용을 작성하세요....',
      modules: {
        toolbar: [
          [{ header: '1' }, { header: '2' }, { font: [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          ['link', 'image', 'video'],
          ['clean'],
        ],
      },
    });

    const quill = quillInstance.current;

    quill.on('text-change', (delta, oldDelta, source) => {
      if (source === 'user') {
        //글 작성하는 텍스트 source이게 뭔지는 모름 전에 했던거 복사함 
        const text = quill.root.innerHTML;
        change_field("body",text)   //bod
       
      }
    } );
 

  }, [change_field] );
    useEffect(() => {
      if(isEdit){
          const updataContent = post.body
          quillInstance.current.root.innerHTML = updataContent;
          setTitle(post.title)
          change_field("title",post.title)
      }
  },[post,isEdit,change_field] )

  //인풋 글쓰기 타이틀 이벤트 
  const onchange =useCallback((e)=>{
    setTitle(e.target.value)
    change_field("title",e.target.value) //title

    // setTitle(e.target.value)
  },[change_field,setTitle])
 
  return (
    <WriteDiv>
      <TitleInput value={title} onChange={onchange} name="title" placeholder="제목을 입력하세요" />
      <QuillDiv>
        <div ref={quillElement} />
      </QuillDiv>
    </WriteDiv>
  );
};

export default Write