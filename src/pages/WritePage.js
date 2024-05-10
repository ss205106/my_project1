import React, { useCallback, useEffect } from 'react';
import Write from '../component/write/Write';
import Responsive from '../common/Responsive';
import Header from '../common/Header';
import { useNavigate } from 'react-router-dom';
import WriteActionBtn from '../component/write/WriteActionBtn';
import Teg from '../component/write/Teg';
import { connect } from 'react-redux';
import { change_field,reset_write,write} from '../modules/write';
import { update_post } from '../modules/post';

const WritePage = (props) => {

    const {title,body,tags ,writeLoading, wirwriterError, writer,post,isEdit,postError} = props //스테이트 값
    const {change_field,reset_write,write,update_post} = props //액션 함수 
    // console.log(post)
    const navigate= useNavigate()

    // useEffect(()=>{
    //     reset_write()
    // },[reset_write])

    //버튼 클릭함수
    console.log("id", post._id)
    const writeClick =useCallback(()=>{
        if(title === '' || body === ''){
            alert("수정을 완료하세요")
            return
        }
        //postId가 있으면 업데이트 함수 실행
        if(isEdit){
            update_post(post._id,title,body,tags)
            // const {_id} = writer //posts.user{id:...,username:...}
            // navigate(`/${writer.user.username}/${_id}`)   
            navigate(-1)
            return;
        }
            write(title,body,tags)
            // const {_id} = writer //posts.user{id:...,username:...}
            // navigate(`/${writer.user.username}/${_id}`)   
            navigate(-1)
            return;
        },[write,title,body,tags,post,update_post,navigate,isEdit])

    const onCancel=useCallback(()=>{
        navigate("/")
    },[navigate])

    useEffect(()=>{
        if(writer){
            //postpage
            reset_write()
        }
        if(wirwriterError){
            console.log(wirwriterError)
            return
        }
    },[writer,wirwriterError,navigate,reset_write])

    if(writeLoading) return <div>loading...</div>
    return (
        <>
            <Header/>
            <Responsive>
                <h1>글 작성하기</h1>
                <Write postError={postError} isEdit={isEdit} post={post} title={title} body={body} change_field={change_field}/>
                <Teg post={post} isEdit={isEdit} tags={tags} change_field={change_field}/>
                <WriteActionBtn isEdit={isEdit} writeClick={writeClick} onCancel={onCancel}/>
          
            </Responsive>
        </>
    );
};
 //post  id 를 가져와야함 아마도 writer.id 가져오면 될거같음 버튼에 넘겨줘야함
export default connect(
    (state)=>({
      title:state.writeRedux.title,
      body:state.writeRedux.body,
      tags:state.writeRedux.tags,
      writer:state.writeRedux.writer,
      wirwriterError:state.writeRedux.wirwriterError,
      writeLoading:state.loading.writeLoading,
      post:state.postRedux.post,
      isEdit:state.writeRedux.isEdit,
      postError:state.postRedux.postError
    })
    ,{
      change_field,reset_write,write,update_post
  
  })(WritePage);