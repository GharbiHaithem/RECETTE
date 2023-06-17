import axios from 'axios'
import { base_url } from '../../utils/baseUrl'
// import { config } from '../../utils/axiosConfig'

const uploadImages = async(data)=>{
const response = await axios.put(`https://recette-crud.onrender.com/api/upload/`,data)
console.log(response)
return response.data
} 

const deleteImages = async(id)=>{
const response = await axios.delete(`https://recette-crud.onrender.com/api/delete-img/${id}`)
console.log(response)
return response.data
}
const uploadServices = {
    uploadImages,deleteImages
}
export default uploadServices