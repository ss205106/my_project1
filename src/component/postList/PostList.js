import React from 'react';
import Responsive from '../../common/Responsive';//이 컴포넌트 로 감싸줌
import styled from 'styled-components';// 스타일
// import { useSearchParams, } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import PostItem from './PostItem';
const PostListDiv = styled(Responsive)`
    margin-top:3rem;
`

const PostList = (props) => {
    const {posts} = props
    
    // console.log(posts)
    return (
        <PostListDiv>
           <div>
          {posts && posts.map(item=> <PostItem item={item}/>)}
           </div>
        </PostListDiv>
    );
};

export default PostList;

