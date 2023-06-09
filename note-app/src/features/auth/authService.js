
import axios from 'axios'
import {base_url } from '../../utils/baseUrl'
const API = axios.create({baseURL:base_url});
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
    if(response.data.message !=="" && response.data.token !==undefined){
        localStorage.setItem('customer',JSON.stringify(response.data))
     
    }
    return await response.data
}

const createUser = async(data)=>{
  
    
    const response = await API.post(`/user/registre`,data)
    console.log(response.data)
    localStorage.setItem('customer',JSON.stringify(response.data))
    return await response.data
}   
const createUserFromGooglePassport = async()=>{

 const response = await API.get('/auth/login/success',{withCredentials:true})
 console.log(response)
 localStorage.setItem('customer',JSON.stringify(response.data.user))
return await response.data.user
}
const servicesAuth = {
    loginUser,createUser,createUserFromGooglePassport
}
export default servicesAuth; 