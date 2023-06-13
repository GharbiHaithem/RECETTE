import React from 'react'
import './style.css'
import { MdOutlineFastfood } from 'react-icons/md'
import { BsFillPatchPlusFill } from 'react-icons/bs'
import { MdOutlinePlaylistAddCheckCircle } from 'react-icons/md'
import {logout} from '../../features/auth/authSlice'
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {HiOutlineHeart} from 'react-icons/hi'
import { Typeahead } from 'react-bootstrap-typeahead';
import {CiLight} from 'react-icons/ci'
import {MdModeNight} from 'react-icons/md'
import { basculeToogle } from '../../features/toogle/toogleSlice';
const MainLayout1 = ({ user,isScreenSmall }) => {
     const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    const showModal = () => {
      setOpen(true)
    }
    const logoutFn = async() => {
  
      dispatch(logout())
         navigate('/')
     
    }
    const [largeur, setLargeur] = useState(window.innerWidth)
    useEffect(() => {
      function handleResize() {
        setLargeur(window.innerWidth)
      }
      window.addEventListener('resize', handleResize)
      return () => {
        window.removeEventListener('resize', handleResize)
      }
  
    }, [])
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDispatch()

  
  
    //    const toogleState=useSelector(state=>state.toogle.darkMode)
    const [collapsedActive, setCollapsedActive] = useState(false)
    useEffect(() => {
      let elem = document.querySelector('.ant-layout-sider-collapsed')
      let elem1 = document.querySelector('.ant-layout-sider')
      let elem3 = document.querySelector('.ant-layout-content css-dev-only-do-not-override-w8mnev')
      setCollapsedActive(true)
      // let elem2 = document.querySelector('.large-logo')
      // let elem3 = document.querySelector('.sm-logo')
      console.log(isScreenSmall)
      if(elem3 && isScreenSmall){
        elem3.style.width='100%'
      }
       if(elem && isScreenSmall ){
      
        elem.style.maxWidth='60px'
        elem.style.minWidth='60px'
        elem.style.width='60px'
        
        elem.style.background="white"
        
        
       }
       if(elem1 && isScreenSmall){
        elem1.style.maxWidth='60px'
        elem1.style.minWidth='60px'
        elem1.style.width='60px'
        
        elem1.style.background="white"
        
       }
  
   
      console.log(collapsedActive)
    }, [collapsedActive,isScreenSmall])
  
    useEffect(()=>{
  const btn = document.querySelector('.ant-btn')
  
      if(isScreenSmall  && btn){
        setCollapsed(true)
        btn.style.display='none'
      }
    },[isScreenSmall])
  
    const [images, setImages] = useState("")
    const stateUser = useSelector(state=>state?.auth?.user)
    console.log(stateUser)
     console.log(user)
    const localstorage = (JSON.parse(localStorage.getItem('customer'))) || stateUser
  useEffect(()=>{
  const showImg = async()=>{
    if(localstorage && user){
     await setImages(localstorage?.pic)
    }
    else {  setImages(user?.pic)}
  }
    showImg()
  },[localstorage,user])
   const recettestate = useSelector(state=>state?.recette?.recette)
   const[recettes,setRecettes]=useState([])
  useEffect(()=>{
    let data= [];
    for(let i=0 ; i<recettestate.length ;i++){
      data.push({id:i,recette:recettestate[i]._id,name:recettestate[i].title})
    }
    setRecettes(data)
  },[recettestate]) 
  const toogleState = useSelector(state=>state?.toogle?.darkMode)
 
  useEffect(()=>{
    if(toogleState){
        document.body.style.background ="#001529"
        document.body.style.color = "white"
    }else{
        document.body.style.background ="white"
        document.body.style.color = "black" 
    }
 
  },[toogleState])
  useEffect(()=>{
    const e1 = document.querySelector('.header-main')
    if(toogleState){
        e1.style.background = "#001529"
        e1.style.color="white"
    }else{
        e1.style.background ="white"
        e1.style.color="black"
    }
  },[toogleState])
    return (
        <div className='main-wrapper'>
           
                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                    <div className='header-main '>
                       <div className='row d-flex align-items-center' >
                     
                        <div className='mx-2' style={{width:`${isScreenSmall ? '45%' : '45%'}`}}>
                        <Typeahead
            id="pagination-example"
            onPaginate={() => console.log('Results paginated')}

            options={recettes}
            placeholder="Pick a product..."
            labelKey={'name'}
            style={{ width: '100%' }}
            minLength={1}
            maxHeight='1'
            onChange={(selected) => {
              if (selected.length > 0) {
                 navigate(`/myrecette/recette-details/${selected[0]?.recette}`)
              } else {
                 navigate('/myrecette/recette-list')
              }
            }}

          />
                        </div>
                        <div className={` `} style={{  width:`${isScreenSmall ? '37%' : '30%' }`}}>
                        <div className='d-flex align-items-center '>
              <div className=' nav-item   dropdown'>


                <button class="btn btn-transparent border border-0 " type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={images} style={{ width: `${isScreenSmall ? "35px" :  "60px"}`, height: `${isScreenSmall ? "35px" :  "60px"}`, borderRadius: '50%' }} alt='rrrr' data-toggle='dropdown' />
                </button>



                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li><button class="dropdown-item" type="button">Action</button></li>
                  <li><button class="dropdown-item" type="button">Another action</button></li>
                  <li><button class="dropdown-item" type="button" onClick={logoutFn}>LOGOUT</button></li>
                </ul>
              </div>


              <div  >
                <h5 className={`mb-0 ${isScreenSmall ? "text-small" : "y"}`} >{stateUser && stateUser?.fullname}</h5>
                <p className='mb-0 mt-2 x' style={{ lineHeight: 0 }}>{stateUser && stateUser?.email}</p>
              </div>
              </div>
                        </div>
                        <div className=''style={{textAlign:'end',width:`${isScreenSmall ? '10%' : '5%'}`}}>
                        <div onClick={()=>dispatch(basculeToogle())}>{toogleState ? <CiLight className='fs-4'/> : <MdModeNight className='fs-4' />}</div>
                        </div>
                       </div>
                    </div>
                </div>
            </div>
            <div className='row '>
              
               
                <div className='left-side-bar' style={{width:`${isScreenSmall ?'25%' : '30%'}`}}>
              

                </div>
           
              
            <div className='' style={{textAlign:'end',width:`${isScreenSmall ? '75%' : '70%'}`}}>
            <Outlet />
            </div>
            </div>
        </div>
    )
}

export default MainLayout1
