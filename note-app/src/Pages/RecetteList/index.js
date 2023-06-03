import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getAllRecettes from '../../features/recette/recetteSlice'
import RecetteCard from '../../Component/RecetteCard'
import './style.css'
const ListRecette = () => {
    const dispatch = useDispatch()
 



  const recetteState = useSelector(state=>state?.recette?.recette)
  console.log(recetteState)
    return (
        <div className='list-recette-wrapper'>
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
            </div>
            

    )
}

export default ListRecette
