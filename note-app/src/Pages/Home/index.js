import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../features/auth/authSlice';
import RecetteCard from '../../Component/RecetteCard';
import './style.css'
const Home = ({user}) => {
    console.log(user)
   const dispatch = useDispatch()
  
   useEffect(()=>{
    if(user)
    {dispatch(createUser({fullname:user?.displayName, email:user?.emails[0]?.value,googleId:user?.id,secret:user?.provider,pic:user?.photos[0]?.value}))
}
       
                        
},[dispatch,user])
const recettestaus = useSelector(state=>state?.recette?.recette)
    return (
        <div className='home-wrapper my-4'>
         <div className='container'>
            <div className='row'> 
              {
                recettestaus && recettestaus?.map((item,index)=>{
                   return <div className='col-md-4 col-sm-12 mb-5' key={index}>
                    <div className='card'>
                       
                            <img src={item?.images[0].url} style={{width:'100%',heigth:'200px'}} alt='' />
                            <div className='desc'>
                            <p>{item?.category}</p>
                         
                         </div>
                        
                    </div>
                   </div>
                })
              }
            </div>
         </div>
         
          
        </div>
    )
}

export default Home
