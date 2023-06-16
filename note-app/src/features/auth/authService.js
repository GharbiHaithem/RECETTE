
import axios from 'axios'
import {base_url } from '../../utils/baseUrl'
const API = axios.create({baseURL:"https://recette-crud.onrender.com/api"});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
const loginUser = async(data)=>{
    const response = await API.post(`/user/login`,data)
    console.log(response.data)
    return await response.data
}

const createUser = async(data)=>{
  
    
    const response = await API.post(`/user/registre`,data)
    console.log(response.data)
    localStorage.setItem('customer',JSON.stringify(response.data))
    return await response.data
}   

const servicesAuth = {
    loginUser,createUser
}
export default servicesAuth; 