import React from 'react';
import styled from 'styled-components';
// import Header from './Header';
const ResponsiveDiv = styled.div`
    padding-left:1rem;
    padding-right:1rem;
    width:1024px;
    margin:0 auto;
    @media (mex-width: 1024px){
        width: 768px;
    }
    @media (mex-width: 784px){
        width: 100%
    }
`
//@media 브라우저 크기에 맞게 반응형 

const Responsive = ({children,...rest}) => {
    //태그처럼 사용할수있고 그밑에 자식을 넣어줌?
    return (
        <>
            <ResponsiveDiv {...rest}>
                {children}
            </ResponsiveDiv>
        </>
    );
};

export default Responsive;