import React from 'react'
import './style.css'
import { MdOutlineFastfood } from 'react-icons/md'
import { BsFillPatchPlusFill } from 'react-icons/bs'
import { MdOutlinePlaylistAddCheckCircle } from 'react-icons/md'
import { logout } from '../../features/auth/authSlice'
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineHeart } from 'react-icons/hi'
import { Typeahead } from 'react-bootstrap-typeahead';
import { CiLight } from 'react-icons/ci'
import { MdModeNight } from 'react-icons/md'
import { basculeToogle } from '../../features/toogle/toogleSlice';
import { SiMicrosoftonenote } from 'react-icons/si'
import { MdArrowDropDown } from 'react-icons/md'
import { MdAssignmentAdd } from 'react-icons/md'
import { TbListNumbers } from 'react-icons/tb'
import { AiOutlineMenuFold } from 'react-icons/ai'
const MainLayout1 = ({ user, isScreenSmall }) => {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const showModal = () => {
    setOpen(true)
  }
  const logoutFn = async () => {

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
    if (elem3 && isScreenSmall) {
      elem3.style.width = '100%'
    }
    if (elem && isScreenSmall) {

      elem.style.maxWidth = '60px'
      elem.style.minWidth = '60px'
      elem.style.width = '60px'

      elem.style.background = "white"


    }
    if (elem1 && isScreenSmall) {
      elem1.style.maxWidth = '60px'
      elem1.style.minWidth = '60px'
      elem1.style.width = '60px'

      elem1.style.background = "white"

    }


    console.log(collapsedActive)
  }, [collapsedActive, isScreenSmall])

  useEffect(() => {
    const btn = document.querySelector('.ant-btn')

    if (isScreenSmall && btn) {
      setCollapsed(true)
      btn.style.display = 'none'
    }
  }, [isScreenSmall])
 const[showLeftSideBar,setShowLeftSideBar] = useState(false)

  const imgUrl = useSelector(state => state?.auth?.user?.pic)
  const [images, setImages] = useState("")
  const stateUser = useSelector(state => state?.auth?.user)
  console.log(stateUser)
  console.log(user)
  const localstorage = (JSON.parse(localStorage.getItem('customer'))) || stateUser
  const [urlImg,setUrlImg]=useState(false)
  useEffect(()=>{
    if(localstorage){
      setTimeout(()=>{
       setUrlImg(imgUrl)
      },3000)
    }
  },[localstorage,imgUrl])
  const recettestate = useSelector(state => state?.recette?.recette)
  const [recettes, setRecettes] = useState([])
  useEffect(() => {
    let data = [];
    if (recettestate?.length > 0) {
      for (let i = 0; i < recettestate.length; i++) {
        data.push({ id: i, recette: recettestate[i]._id, name: recettestate[i].title })
      }
      setRecettes(data)
    }

  }, [recettestate])
  const toogleState = useSelector(state => state?.toogle?.darkMode)
  const userName = useSelector(state => state?.auth?.user)
  useEffect(() => {
    if (toogleState) {
      document.body.style.background = "#001529"
      document.body.style.color = "white"
    } else {
      document.body.style.background = "white"
      document.body.style.color = "black"
    }

  }, [toogleState])
  const [isHovered,setIsHovered] = useState(false)
  useEffect(() => {
    const e1 = document.querySelector('.header-main')
    if (toogleState) {
      e1.style.background = "#001529"
      e1.style.color = "white"
    } else {
      e1.style.background = "white"
      e1.style.color = "black"
    }
  }, [toogleState])
  return (
    <div className='main-wrapper'>

      <div className='row'>
        <div className='col-md-12 col-lg-12'>
          <div className='header-main py-3'>
            <div className='row  ' >
                     <div className='d-flex align-items-center justify-content-between'>
                     <div style={{width:'30px',marginLeft:'20px', fontSize:`${isScreenSmall ? "20px" : '40px'}`}} onClick={()=>setShowLeftSideBar(!showLeftSideBar)} ><AiOutlineMenuFold style={{ color:`${toogleState ? "white" : "black"}`  }} /></div>
              <div className='mx-3'>
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
              <div className={`d-flex align-items-center `} >
              
                  <div className=' nav-item   dropdown '>


                    <button className={`btn btn-transparent border border-0`}
                     type="button" id="dropdownMenu2" data-bs-toggle="dropdown"
                      aria-expanded="false"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      style={{  background: `${isHovered && toogleState ? '#001529' : (!isHovered && toogleState ? '#001529' : "white")  }`}}
                      >

                      { imgUrl.length === 0  ? <div className="d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', background: '#ffc107', borderRadius: '50%' }}><span className='text-uppercase ' style={{ fontWeight: '900' }} >{userName?.firstname[0]}</span></div> :  urlImg&&<img src={urlImg} style={{ width: `${isScreenSmall ? "35px" : "60px"}`,display:'block', height: `${isScreenSmall ? "35px" : "60px"}`, borderRadius: '50%' }} alt='rrrr' data-toggle='dropdown' />}
                 
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
              <div className='' style={{ textAlign: 'end' }}>
                <div onClick={() => dispatch(basculeToogle())}>{toogleState ? <CiLight className='fs-4' /> : <MdModeNight className='fs-4' />}</div>
              </div>
                     </div>
            </div>
          </div>
        </div>
      </div>
      <div className='row '>


      <div className={`${showLeftSideBar ? "open" : "left-side-bar"} position-fixed `} style={{left:0,top:'100px' ,zIndex:15}}>
          <div class="dropdown">
            <Link class={`btn ${toogleState ? "btn-transparent text-light" : "btn-transparent"}  dropdown-toggle`} to="#" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
              <SiMicrosoftonenote className={`${toogleState ? "text-light" : "text-dark"} ${isScreenSmall ? "fs-4" : "fs-3"}`} /><MdArrowDropDown className={`${toogleState ? "text-light" : "text-dark"} fs-3`} />
            </Link>

            <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <li><Link class="dropdown-item" to={'add-recette'} onClick={()=>setShowLeftSideBar(false)}><MdAssignmentAdd className='fs-3' />ADD</Link></li>
              <li><Link class="dropdown-item" to="recette-list" onClick={()=>setShowLeftSideBar(false)}><TbListNumbers className='fs-3' />LIST</Link></li>

            </ul>
          </div>

        </div>


        <div className={`${showLeftSideBar ? "mx-5" : "" }`}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default MainLayout1
