
import axios from 'axios'

const API = axios.create({baseURL:"http://localhost:5000/api"});
API.interceptors.request.use((req)=>{
   if(localStorage.getItem('customer')){
    req.headers.authorization =`Bearer ${
        JSON.parse(localStorage.getItem("customer")).token
    }`
   }
   return req;
})
const createrecette = async(data)=>{
    console.log(data)
    const response = await API.post(`/recette/create`,data)
    return await response.data
}
const getAllrecette = async()=>{
   
    const response = await API.get(`/recette/allRecette`)
    console.log(response.data)
    return await response.data
}

const getrecette = async(id)=>{
    const response = await API.get(`/recette/getarecette/${id}`)
    console.log(response.data)
    return  await response.data  
}
const delrecette = async(id)=>{
    const response = await API.delete(`/recette/delete/${id}`)
    console.log(response.data)
    return  await response.data  
}
const updateRecette = async(data)=>{
    console.log(data)
    const response = await API.put(`/recette/update/${data.id}`,data.recetteData)
    console.log(response.data);
    return  await response.data  
}
const addwishlist = async(data)=>{
    console.log(data)
    const response = await API.put(`/user/addWidhList`,{recetteId:data})
    console.log(response.data);
    return  await response.data  
}

const getWishList = async(data)=>{
    console.log(data)
    const response = await API.get(`/user/wishListGet`)
    console.log(response.data);
    return  await response.data  
}
const recetteServices = {
    createrecette,getAllrecette,getrecette,delrecette,updateRecette,addwishlist,getWishList
} 
export default recetteServices
