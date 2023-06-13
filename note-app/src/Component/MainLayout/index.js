import {
  MenuFoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style.css'
import { MdOutlineFastfood } from 'react-icons/md'
import { BsFillPatchPlusFill } from 'react-icons/bs'
import { MdOutlinePlaylistAddCheckCircle } from 'react-icons/md'

import {logout} from '../../features/auth/authSlice'
import { IoMdNotificationsOutline } from 'react-icons/io'
import me from '../../images/patiss1.jpg'

import { Button, Layout, Menu } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import {basculeToogle} from '../../features/Toogle/toogleSlice'
import { useDispatch, useSelector } from 'react-redux';
import {HiOutlineHeart} from 'react-icons/hi'
import { Typeahead } from 'react-bootstrap-typeahead';
import {CiLight} from 'react-icons/ci'
import {MdModeNight} from 'react-icons/md'
import axios from 'axios';
import { basculeToogle } from '../../features/toogle/toogleSlice';
import { theme } from 'antd';
const { Header, Sider, Content } = Layout;

const MainLayout = ({ user,isScreenSmall }) => {
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
  const { token: { colorBgContainer } } = theme.useToken();


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
  let elem =  document.querySelector('.ant-layout-content')
 if(elem){
  elem.style.color = `${toogleState ? "black" : "white"}`

 }
},[toogleState])
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo py-3 text-center text-light" >
          {collapsedActive && <div className='fs-4'>Dev Gharouch</div>}
          {!collapsedActive && <div className='fs-4'>D G</div>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "signout") {

            } else {
              navigate(key)
            }
          }}
          items={[

            {
              key: 'recette',
              icon: <MdOutlineFastfood className='fs-5' />,
              label: 'Recette Management',
              children: [
                {
                  key: 'add-recette',
                  icon: <BsFillPatchPlusFill className="fs-5" />,
                  label: 'Add Recette',

                },
                {
                  key: 'recette-list',
                  icon: <MdOutlinePlaylistAddCheckCircle className="fs-5" />,
                  label: 'List Recette',
                }
              ]
            },

          ]}
        />

      </Sider>
      <Layout>
        <Header

          style={{
            padding: 0,
            background:  toogleState ? "#001529" : "white",
            color: toogleState ? "white" : "#001529",
          }}
          className={`d-flex justify-content-between align-items-center  ant-layout-header "}`}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => {
              setCollapsedActive(!collapsedActive)
              setCollapsed(!collapsed)
            }}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />

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
          <div className='pe-5'>
            <div className='d-flex justify-content-between  gap-10'>

              <div className='position-relative notification' >

                <Link to='/myrecette/wishList'><HiOutlineHeart className='fs-1'/></Link>
                <span className='badge bg-danger rounded-circle p-1 position-absolute' >5</span>
              </div>
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


              <div onClick={()=>dispatch(basculeToogle())}>{toogleState ? <CiLight className='fs-4'/> : <MdModeNight className='fs-4' />}</div>
            </div>
          </div>

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
               background: toogleState ? "#001529" : "white",
               color:toogleState ? "white" : "#001529",
       
          }}
        >
    
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <Outlet />
        </Content>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

      </Layout>
    </Layout>
  );
};
export default MainLayout;