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

import { Button, Layout, Menu, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
// import {basculeToogle} from '../../features/Toogle/toogleSlice'
import { useDispatch, useSelector } from 'react-redux';

import { Typeahead } from 'react-bootstrap-typeahead';
import axios from 'axios';
const { Header, Sider, Content } = Layout;
const MainLayout = ({ user }) => {
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
  const {
    token: { colorBgContainer },
  } = theme.useToken();


  //    const toogleState=useSelector(state=>state.toogle.darkMode)
  const [collapsedActive, setCollapsedActive] = useState(false)
  useEffect(() => {
    let elem = document.querySelector('.ant-layout-sider-collapsed')
    // let elem2 = document.querySelector('.large-logo')
    // let elem3 = document.querySelector('.sm-logo')

    if (elem) {
      setCollapsedActive(true)
    }
    console.log(collapsedActive)
  }, [collapsedActive])
  const [images, setImages] = useState("")
  const stateUser = useSelector(state=>state?.auth?.user)
  console.log(stateUser)
  

useEffect(()=>{
  const fetchImg=async()=>{
    await setTimeout(()=>{
      setImages(stateUser &&  stateUser?.pic)
    },400) 
     console.log(images)
   }
   fetchImg()
},[images,stateUser])
 const recettestate = useSelector(state=>state?.recette?.recette)
 const[recettes,setRecettes]=useState([])
useEffect(()=>{
  let data= [];
  for(let i=0 ; i<recettestate.length ;i++){
    data.push({id:i,recette:recettestate[i]._id,name:recettestate[i].title})
  }
  setRecettes(data)
},[recettestate]) 
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
            background: "white",
            color: "#001529"
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
            <div className='d-flex justify-content-between align-items-center gap-30'>

              <div className='position-relative notification'>

                <IoMdNotificationsOutline className='fs-1' />
                <span className='badge bg-danger rounded-circle p-1 position-absolute' >5</span>
              </div>

              <div className='d-flex gap-10 align-items-center nav-item   dropdown'>


                <button class="btn btn-transparent border border-0 " type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={images && images} style={{ width: '60px', height: '60px', borderRadius: '50%' }} alt='rrrr' data-toggle='dropdown' />
                </button>



                <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                  <li><button class="dropdown-item" type="button">Action</button></li>
                  <li><button class="dropdown-item" type="button">Another action</button></li>
                  <li><button class="dropdown-item" type="button" onClick={logoutFn}>LOGOUT</button></li>
                </ul>
              </div>


              <div  >
                <h5 className='mb-0 y' >{stateUser && stateUser?.fullname}</h5>
                <p className='mb-0 mt-2 x' style={{ lineHeight: 0 }}>{stateUser && stateUser?.email}</p>
              </div>



              <div><button className='btn btn-warning btn-sm text-light' >TOOGLE</button></div>
            </div>
          </div>

        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            //   background: toogleState ? "#001529" : "white",
            //   color:toogleState ? "white" : "#001529"
            background: "white",
            color: "black",
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