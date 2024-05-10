import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../common/Pallete';
import { Link } from 'react-router-dom';
import Tag from '../../common/Tag'
const PostItemDiv = styled.div`
    padding-top: 3rem;
    padding-bottom: 3rem;

    &:first-child{
        padding-top: 0;
    }

    &+&{
        border-top: 1px solid ${palette.Indigo[2]};
    }
    p{
        margin-top: 2rem;
    }
`
const StyleLink = styled(Link)`
font-size: 2rem;
margin-bottom: 0;
margin-top: 0;
color:${palette.Indigo[4]};
&:hover{
    color: ${palette.Indigo[9]};
}
`

const SubInfoDiv = styled.div`
    ${ props => 
        props.hasMarginTop && 
        css`
            margin-top: 1rem;
        `}
        color: ${palette.Indigo[4]};
        span+span: before{
            color: ${palette.Indigo[9]};
            padding-left: 0.25rem;
            padding-right: 0.25rem;
            content: '\\B7';
        }
`



const PostItem = (props) => {
    const {item} = props
    // console.log(item.tags)
    console.log(item.user.username)
    console.log(item._id)
    return (
            <PostItemDiv>
            <h2>    
                <StyleLink to={`/${item.user.username}/${item._id}`}>{item.title}</StyleLink>
            </h2>
            <SubInfoDiv>
                <span>
                    <b>
                        <Link to={`/${item.user.username}`}>{item.user.username}</Link>
                    </b>
                </span>
                <span>{new Date().toLocaleString()}</span>
            </SubInfoDiv>
            <div style={{display:"flex", justifyContent: "center", alignItems: "center"}}>
                {item.tags.map(t=><Link to={`tags=${t}`}>{t}</Link>)}
            </div>
            <div dangerouslySetInnerHTML={{__html:item.body}}/>
        
        </PostItemDiv>
    );
};

export default PostItem;