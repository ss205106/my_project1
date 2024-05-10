import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from './Pallete';

    const TagDiv = styled.div`
        margin-top: 0.5rem;
        .teg{
            display:inline-block;
            color: ${palette.Blue[4]};
            text-decoration: none;
            margin-right: 0.5rem;
        &:hover{
                color: ${palette.Blue[9]};
            }
        }
    ` 
    const Tag = (props) => {
        const {t} =props
       
        return (
            <TagDiv>
                    <Link className="teg" to = '/?teg=teg'>#{t}</Link>
            </TagDiv>
        );
    };

    export default Tag;