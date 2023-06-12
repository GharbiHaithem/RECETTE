import axios from 'axios'



const API = axios.create({baseURL:"https://recette-crud.onrender.com/api"});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
const createCategory = async(data)=>{
    console.log(data)
    const response = await API.post(`/category/create`,data)
    return await response.data
}
const getCategories = async()=>{
    const response = await API.get(`/category/categories`)
    console.log(response.data)
    return await response.data
}
const servicesCategory = {
createCategory,getCategories
} 
export default servicesCategory