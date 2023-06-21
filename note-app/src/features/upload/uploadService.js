import axios from 'axios'
import { base_url } from '../../utils/baseUrl'
// import { config } from '../../utils/axiosConfig'

const uploadImages = async(data)=>{
const response = await axios.put(`http://localhost:5000/api/upload/`,data)
console.log(response)
return response.data
} 

const deleteImages = async(id)=>{
const response = await axios.delete(`http://localhost:5000/api/delete-img/${id}`)
console.log(response)
return response.data
}
const uploadServices = {
    uploadImages,deleteImages
}
export default uploadServices