import React, { useEffect } from 'react'
import RecetteCard from '../RecetteCard'
import { useDispatch, useSelector } from 'react-redux'
import { getAllWishList } from '../../features/recette/recetteSlice'
const WhishList = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
   dispatch(getAllWishList())
    },[dispatch])
    const whishlistState = useSelector(state=>state?.recette?.wishlists?.whishlist)
    console.log(whishlistState)
    return (
        <div className='whishList-wrapper'>
            <div className='row'>
               {
                whishlistState && whishlistState?.map((item,index)=>{
                    return<>
                     <div className='col-md-4' key={index}>
                    <RecetteCard item={item} />
                    
                </div>
                    </>
                })
               }
            </div>
        </div>
    )
}

export default WhishList
