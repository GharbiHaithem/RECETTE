import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import {IoIosCloseCircleOutline} from 'react-icons/io'
import CustomerInput from '../CustomerInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {useDispatch} from 'react-redux'
import { createCat, getAllCat } from '../../features/category/categorySlice'
import { useNavigate } from 'react-router-dom'
const FormModal = ({open,setOpen,onClose}) => {
    const myElementRef = useRef(null)
   
    const [title,setTitle]=useState("")
    const navigate = useNavigate()
    const dispatch =useDispatch()
    const handleSubmit =(e)=>{
        e.preventDefault()
        console.log(title)
        dispatch(createCat({title}))
        setTitle("")
        setTimeout(()=>{
            dispatch(getAllCat())
           setOpen(false)
        },400)
     
        
           
      
            
   }
 
  
     const handleClick = (event)=>{
        const myElement = myElementRef.current
     if(event.target.classList.contains(`${myElement.className}`)){
        onClose()
     }
     }
  

  
    
    return (
        <div className='formModal' ref={myElementRef}  onClick={handleClick}>
          
             <form className='form'>
                <div className='d-flex align-items-center justify-content-between p-3'>
                    <h6>ADD CATEGORY</h6>
                    <IoIosCloseCircleOutline onClick={()=>setOpen(false)} className='fs-4'/>
                 
                </div>
                <hr/>
                <div className='container d-flex flex-column gap-10'>
                <CustomerInput placeholder={'Enter Category de votre recette'} name='title' value={title} onChange={(e)=>setTitle(e.target.value)} />
              
                <button className='button w-100 text-light'  type='button'  onClick={handleSubmit}>ADD CATEGORY</button>
                </div>
             </form>
        </div>
        
    )
}

export default FormModal
