import axios from 'axios';
import { MAIN_URL } from '@/common/Url';
export function userLogin(data)
{
    return axios.post(`${MAIN_URL}login`,data)
}
export function userRegister(data)
{
    return axios.post(`${MAIN_URL}register`,data)
}
//add
export function userContact(data)
{
    return axios.post(`${MAIN_URL}contactus`,data)
}
export function userCategory(data)
{
    return axios.post(`${MAIN_URL}categories`,data)
}
export function banner()
{
    return axios.get(`${MAIN_URL}banner`)
}
export function category()
{
    return axios.get(`${MAIN_URL}category`)
}

export function product()
{
    return axios.get(`${MAIN_URL}product`)
}
export function categorybyid(id)

{
    return axios.get(`${MAIN_URL}category/${id}`)
}
export function profile()
{
    var token = localStorage.getItem('token');
    return axios.get(`${MAIN_URL}profile`, { headers: { "Authorization": `Bearer ${token}` } })
}
export function changePassword(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}changePassword`,data,{ headers: { "Authorization": `Bearer ${token}` } })
}
export function servicesCMS(){
    return axios.get(`${MAIN_URL}services`);
}


export default {userLogin,userRegister,userContact,userCategory,banner,product,categorybyid,profile,changePassword,servicesCMS};