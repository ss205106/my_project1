import React from 'react';
import { useSearchParams } from 'react-router-dom';
import qs from 'qs'
import styled from "styled-components"
import Button from '../../common/Button';
import { useSelector } from 'react-redux';
const PaginationDiv = styled.div`
    width: 320px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
`



const Pagination = () => {
    const [serchParams] = useSearchParams()
    const page = Number(serchParams.get('page')) || 1
    // console.log(page)
    const {lastPage} = useSelector(state => ({
        lastPage:state.postList.lastPage
    }))
    // console.log(lastPage)
    const bildLink = ({page}) => {
        
        const query = qs.stringify({page})
        // console.log(query)
        return `/?${query}`
    }
   
    return (
        <PaginationDiv>
                 <Button 
         
         disabled={page === 1}
         to = {
             page === 1 ? undefined : bildLink({page:page-1} ) }>
         이전
     </Button>
     <div>{page}</div>
     <Button 
    
         disabled={page === lastPage}
         to = {
             page === lastPage ? undefined : bildLink({page: page+1})}
             >
         다음
     </Button>
        </PaginationDiv>
    );
};

export default Pagination;