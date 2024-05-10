import axios from "axios";
const request = axios.create()
export const write_post = async (title, body, tags, user) => {
    try {
        // user 객체를 요청에 추가하여 서버로 전송합니다.
        const response = await request.post('/api/posts', { title, body, tags, user });
        return response.data; // API 요청의 결과인 데이터를 반환합니다.
    } catch (error) {
        throw error; // 오류가 발생한 경우 예외를 던집니다.
    }
};

export const read = (id) =>  request.get(`/api/posts/${id}`)

export const list_post = async (page, username,tags) => {
    try {
        const response = await axios.get('/api/posts', { params: { page, username,tags } });
        return response
    } catch (error) {
        throw error; // 에러를 상위로 전파합니다.
    }
};
export const remove = (id) => {
    request.delete(`/api/posts/${id}`,id)
}

export const update = (id,title,body,tags) => {
    //postId 있는지 확인하고 넘기기 
    request.patch(`/api/posts/${id}`,{title,body,tags})
}