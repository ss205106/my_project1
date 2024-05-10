import axios from "axios"

const request = axios.create()

export const login = (username,password) => {
    const response = request.post('/api/auth/login',{username,password})   //백앤드쪽으로간다
    return response
}
export const register = (username,password) => {
    console.log(username,password)
    const response = request.post("/api/auth/register",{username,password})
    console.log(response)
    return response
}
export const check = () => {
    const response = request.get('/api/auth/check')
    return response
}

export const logout = () => {
    const response = request.post('/api/auth/logout')
    return response
}