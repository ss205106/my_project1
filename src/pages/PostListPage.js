import React, { useEffect } from 'react';
import Header from '../common/Header';
import PostList from '../component/postList/PostList';

import { useSelector, useDispatch } from 'react-redux';
import { list } from '../modules/postList';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../component/postList/Pagination';
const PostListpage = () => {
    
    const dispatch = useDispatch();
    const {user} = useSelector(state=>({
        user:state.user.user
    }))
    const [seearchParams] = useSearchParams()
    const tag = seearchParams.get("tag") || ""
    const page = Number(seearchParams.get("page")) || ""

    useEffect(() => {
        // 포스트 목록을 가져오는 액션을 디스패치합니다.
      if(user){
          dispatch(list(page,user.username,tag))
        }else return
    }, [dispatch,user,tag,page]);

    const {posts} =useSelector(state=>({
        posts:state.postList.posts
    }))
    // console.log(posts)
    return (
        <div>
            <Header/>
           {user && 
           <>
           <PostList posts={posts}/>
           <Pagination/>
           </>
           }
         
        </div>
    );
};

export default PostListpage;