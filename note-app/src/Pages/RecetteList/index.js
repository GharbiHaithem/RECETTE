import React, { useEffect, useState } from 'react'
import {MdOutlineVerticalAlignTop} from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import getAllRecettes from '../../features/recette/recetteSlice'
import RecetteCard from '../../Component/RecetteCard'

import './style.css'
const ListRecette = () => {
    const dispatch = useDispatch()
 

    const[showButton,setShowButton]=useState(false)
useEffect(()=>{
const handleScroll = ()=>{
    if(window.pageYOffset > 50){
        setShowButton(true)
    }else{
        setShowButton(false)
    }
}

console.log(showButton)
window.addEventListener('scroll',handleScroll)
return()=>window.removeEventListener('scroll',handleScroll)

},[showButton])
const scrollToTop=()=>{
    window.scrollTo({top:0,behavior:'smooth'})
}

  const recetteState = useSelector(state=>state?.recette?.recette)
  console.log(recetteState)
    return (
        <div className='list-recette-wrapper position-relative'>
            <div className='container'>
                <div className='row'>
                   
{
    recetteState && recetteState?.map((item,index)=>{
        return(<>
         <div className='col-md-4' key={index}>
           <RecetteCard item={item} />
         </div>
        </>)
    })
}
                    </div>
                </div>
                { showButton && <div style={{bottom:50,right:50,position:'fixed'}}>
                    <button style={{width:'100%',padding:'5px',borderRadius:'50%'}} onClick={scrollToTop}><MdOutlineVerticalAlignTop className='fs-3'/></button>
                </div>}
            </div>
            

    )
}

export default ListRecette
