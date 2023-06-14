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
import MainLayout1 from './Component/MainLayout1';
import {base_url } from './utils/baseUrl'
function App() {

 console.log(base_url)
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
  const url = `${base_url}/auth/login/success`;
  
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
const [isScreenSmall, setIsScreenSmall] = useState(false);

useEffect(() => {
  const handleResize = () => {
    const isSmall = window.matchMedia("(max-width: 600px)").matches;
    setIsScreenSmall(isSmall);
  };

  // Ajoute un écouteur d'événement pour détecter les changements de taille d'écran
  window.addEventListener("resize", handleResize);

  // Vérifie la taille de l'écran au chargement initial de la page
  handleResize();
  console.log(isScreenSmall)
  // Nettoie l'écouteur d'événement lorsque le composant est démonté
  return () => {
    window.removeEventListener("resize", handleResize);
  };

}, [isScreenSmall]);

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
            <Route path='/myrecette' element={<MainLayout1 user={user} isScreenSmall={isScreenSmall} />}>
          
                <Route index  element={<Home user={user}  /> } />
                <Route path='add-recette' element={  <AddRecette/>  } />
                <Route  path='recette-list' element={ <ListRecette  isScreenSmall={isScreenSmall} />} /> 
                <Route  path='recette-details/:id' element={<SingleRecette  isScreenSmall={isScreenSmall}/>} />
                <Route  path='update/:id' element={<AddRecette/>} />
                <Route path='wishList' element={<WhishList/>} />
                
            </Route> 
            
       </Routes>
       {userstate && <DarkMode/> }
    </BrowserRouter>
  );
}

export default App;
