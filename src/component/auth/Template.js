import React from 'react';
import styled from 'styled-components';
import palette from '../../common/Pallete';
import Button from '../../common/Button';

const TemplateDiv = styled.div`
    position: absolute; 
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background:${ palette.Gray[2] };
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`
const FromBoxDiv = styled.div`
    box-shadow: 0 0 8px rgba(0,0,0,0.25);
    padding: 2rem;
    width:360px;
    background: white;
    border-radius: 2px;

    .logo{
        display: block;
        padding-bottom: 2rem;
        text-align: center;
        font-weight: bold;
        letter-spacing: 2px;
    }
`

const Template = ( {children} ) => {

    return (
        <TemplateDiv>
            <FromBoxDiv>
                <div className='logo'>
                    <Button to="/" >Blog</Button>
                </div>
                {children}
            </FromBoxDiv>
        </TemplateDiv>
    );
};

export default Template;