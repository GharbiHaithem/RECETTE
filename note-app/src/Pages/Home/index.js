import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux';
import { createUser } from '../../features/auth/authSlice';
import RecetteCard from '../../Component/RecetteCard';
const Home = ({user}) => {
    console.log(user)
   const dispatch = useDispatch()
  
   useEffect(()=>{
    if(user)
    {dispatch(createUser({fullname:user?.displayName, email:user?.emails[0]?.value,googleId:user?.id,secret:user?.provider,pic:user?.photos[0]?.value}))
}
       
                        
},[dispatch,user])
    return (
        <div>
       
         
          
        </div>
    )
}

export default Home
