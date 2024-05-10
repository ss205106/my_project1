import React from 'react';
import Responsive from '../../common/Responsive';
import styled,{css} from 'styled-components';
import palette from '../../common/Pallete';
import { Link } from 'react-router-dom';
import PostAtionBtn from './PostAtionBtn';
import Modal from '../../common/Modal';
import Tag from '../../common/Tag';
const SubInfoDiv = styled.div`
    ${ props => 
        props.hasMarginTop && 
        css`
            margin-top: 1rem;
        `}
        color: ${palette.Pink[6]};
        span+span: before{
            color: ${palette.Pink[4]};
            padding-left: 0.25rem;
            padding-right: 0.25rem;
            content: '\\B7';
        }
`
const PostDiv = styled(Responsive)`
        margin-top: 4rem;
`
const PostHeadDiv = styled.div`
        border-bottom: 1px solid ${palette.Indigo[2]};
        padding-bottom: 3rem;
        margin-bottom: 3rem;
        h1{
            font-size: 3rem;
            line-height: 1.5;
            margin: 0;
        }
`
const PostContentDiv = styled.div`
        font-size: 1.3125rem;
        color: ${palette.Indigo[8]};
`
const Post = (props) => {
    const {post,postError,postLoading,ationBtn} = props
    // if(postError){
    //     if(postError.reponse && postError.reponse.status === 404 ){
    //         return <div>존재하지 않는 포스트입니다.</div>
    //     }

    //     return <div>오류 발생</div>
    // }
   
    if(postLoading) return <div>loading...</div>
    if(!post) return null
    const {title,body,user,tags} = post
    const username = user ? user.username : '';
    // console.log(tags)
    return (
        <PostDiv>
        <PostHeadDiv>
            <h1>{title}</h1>
            <SubInfoDiv>
                <span>
                    <b>
                        <Link>{username}</Link>
                    </b>
                </span>
                <span>{new Date().toLocaleString()}</span>
            </SubInfoDiv>
            <div style={{display:"flex"}}> 
            {tags && tags.map(t=><Tag t={t}/>)}
            </div>
        
        </PostHeadDiv>
        {ationBtn}
        <PostContentDiv dangerouslySetInnerHTML={{__html:body}}></PostContentDiv>
      {/* <Modal/> */}
      {/* <div>123123123123</div> */}
    </PostDiv>
    );
};

export default Post;