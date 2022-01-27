const TOKEN_KEY="token";
export const getToken=()=>{
    return window.localStorage.getItem(TOKEN_KEY)
}
export const saveToken=(token)=>{
     window.localStorage.setItem(TOKEN_KEY,token)
}
export const removeToken=(token)=>{
    window.localStorage.removeItem(TOKEN_KEY,token)
}
export default {getToken , saveToken , removeToken}