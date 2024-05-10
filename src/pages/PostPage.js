import React, { useEffect, useState } from 'react';
import Post from '../component/post/Post';
import Header from '../common/Header';
import { getPost } from '../modules/post';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostAtionBtn from '../component/post/PostAtionBtn';
import { change_field } from '../modules/write';
import Modal from '../common/Modal';
import { delete_post } from '../modules/post';

const PostPage = (props) => {
    const {postId} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
 
    console.log(postId)
   
    const {post,postError,postLoading,user} =useSelector(state=>({
        post:state.postRedux.post,
        postError:state.postRedux.postError,  
        postLoading:state.loading.postLoading,
        user:state.user.user
    }))
    console.log(post)
    
    useEffect(()=>{
        // console.log(postId)
        dispatch(getPost(postId))

    },[postId,dispatch])

    const [modal,setModal] = useState(false)

//    const dispatch = useDispatch()
   
    const isOwner = (user && user.id) === (post.user && post.user.id)
    
   
    console.log(post)
    const onRemve = () =>{
        //api 실행 
    }
    const onEdit = () =>{
        //api실행
        navigate("/write")
        dispatch(change_field("isEdit",true))
      }
    const onRemoveClick= () =>{
        setModal(true)
    }

    const onCancel = ()=>{
        setModal(false)
    }
    const onConfirm = () => {
        setModal(false)
        navigate("/")
        dispatch(delete_post(postId))
     
    }
    return (
        <>
        <Header/>
        <Post 
        post={post} 
        postError={postError} 
        postLoading={postLoading} 
        ationBtn = {isOwner && <PostAtionBtn 
                    onEdit={onEdit} 
                    onRemoveClick={onRemoveClick}/>}
        />
        {modal && <Modal  post={post}  onCancel={onCancel} onConfirm={onConfirm}/>}
        
        </>
    );
};

export default PostPage;