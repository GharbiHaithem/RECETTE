import './App.css';
import {BrowserRouter,Routes,Route, Navigate, useNavigate} from 'react-router-dom'
import Login from './Pages/Login';
import MainLayout from './Component/MainLayout';
import Home from './Pages/Home';
import { useEffect, useState } from 'react';
import AddRecette from './Pages/AddRecette';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { createUser } from './features/auth/authSlice';
import ListRecette from './Pages/RecetteList';
import { getAllRecettes } from './features/recette/recetteSlice';
import SingleRecette from './Component/SignleRecette';
import { OpenRoute } from './Component/Routes/openRoute';
import WhishList from './Component/WhishList';
import DarkMode from './Component/DarkMode';

function App() {
 
  const dispatch = useDispatch()
const userstate  = useSelector(state=>state?.auth?.user)
  const [user,setUser] =useState(null)
  useEffect(()=>{
if(userstate)
 { dispatch(getAllRecettes())}
 
  },[dispatch,userstate])

useEffect(()=>{
  const getUser = async()=>{
    try{
  const url = `http://localhost:5000/auth/login/success`;
  const response = await axios.get(url,{withCredentials:true})
  console.log(response)
   setUser(response.data.user)

  console.log(user)  
  }catch(err){
  console.log(err)
    }
   }
   getUser()

},[])

const toogleState = useSelector(state=>state?.toogle?.darkMode)
useEffect(()=>{
 if(toogleState){
  document.body.style.color='black'
 }
},[toogleState])
// const userState = useSelector(state=>state?.auth?.user)


// useEffect(()=>{
//   if(user){
   
      
//         dispatch(createUser({fullname:user?.displayName, email:user?.emails[0]?.value,googleId:user?.id,secret:user?.provider,pic:user?.photos[0]?.value}))
       
    
//   }
// },[dispatch])


  return (
    <BrowserRouter>
  
       <Routes>
            <Route path='/' element={<OpenRoute>< Login user={user}  /></OpenRoute>} />
            <Route path='/myrecette' element={<MainLayout user={user} />}>
          
                <Route index  element={<Home user={user}  /> } />
                <Route path='add-recette' element={  <AddRecette/>  } />
                <Route  path='recette-list' element={ <ListRecette/>} /> 
                <Route  path='recette-details/:id' element={<SingleRecette/>} />
                <Route  path='update/:id' element={<AddRecette/>} />
                <Route path='wishList' element={<WhishList/>} />
                
            </Route> 
            
       </Routes>
       {userstate && <DarkMode/> }
    </BrowserRouter>
  );
}

export default App;
