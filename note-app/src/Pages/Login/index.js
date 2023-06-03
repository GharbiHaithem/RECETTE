import React, { useEffect, useState } from 'react'
import CustomerInput from '../../Component/CustomerInput'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import SwiperSlider from '../../Component/SwiperSlider'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch, useSelector } from 'react-redux'
import { createUser } from '../../features/auth/authSlice'
import axios from 'axios'
import servicesAuth from '../../features/auth/authService'

const Login = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch()
    let schema = Yup.object().shape({
        email: Yup.string().required('required').email('must be an email valid'),
        password: Yup.string().required('required').min(4).max(20)
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            //    dispatch(login(values))
            //    setShowMessage(message)
          
        }
    })
   
    const [user,setUser] =useState(null)
const userState = useSelector(state=>state?.auth?.user)
   

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
      if(getUserFromGoogle)
   {   getUser()}
    
 },[])
 

   console.log(user)

 

    // const handleLoginFn = ()=>{
    // //  
    
    //     // dispatch(createUser({fullname:user?.displayName, email:user?.emails[0]?.value,googleId:user?.id,secret:user?.provider,pic:user?.photos[0]?.value}))
    //   }
     
    
 
    // useEffect(() => {
    // if(redirectionEnCours)
    //     getUser()
    //     console.log(user)
       
      
        
    //  setRedirectionEnCours(false)
        
         
    // } 
    //   , [dispatch,user,redirectionEnCours]);
const[getUserFromGoogle,setGetUserFromGoogle] = useState(false)

      const handleClick = ()=>{
  
            window.open("http://localhost:5000/auth/google/callback","_self")
            setGetUserFromGoogle(true)
  
       
         
         
        
      }
    return (
        <div className='container'>
        <div className='login-wrapper '>
           
               
                    <div className='row my-5'>
                    <div className='form-login-registre d-flex  align-items-center justify-content-between gap-20 my-5'>
                        <div className='col-md-6 col-sm-6 col-lg-4'>
                            <div className='swipper'>
                            <SwiperSlider />
                            </div>
                        </div>
                        <div className='col-md-6 col-sm-6 col-lg-6 '>
                            <div className='form-login d-flex flex-column ' >
                                <h5 className='text-center text-dark text-gradient'>Login</h5>
                                <hr />
                                <p className='text-center'></p>
                                <form className='d-flex flex-column gap-10' onSubmit={formik.handleSubmit}>

                                    <CustomerInput type={'email'} title={'Email'} name='email' onChange={formik.handleChange('email')} className={'form-control'} value={formik.values.email} placeholder={'Email'} />
                                    {formik.touched.email && formik.errors.email ? <span className='p-1 badge bg-danger rounded-2'>
                                        {formik.errors.email}
                                    </span> : null}
                                    <CustomerInput type={'password'} title={'Password'} name='password' className={'form-control'} onChange={formik.handleChange('password')} value={formik.values.password} placeholder={'Password'} />
                                    {formik.touched.password && formik.errors.password ? <span className='p-1 badge bg-danger rounded-2'>
                                        {formik.errors.password}
                                    </span> : null}
                                    {/* {message && <span className='badge bg-danger p-1'>{showMessage}</span>} */}
                                  

                                   <div className='d-flex justify-content-between fs-6'>
                                    <Link  style={{ textDecoration: 'none'}} >Register</Link>
                                   <Link style={{ textDecoration: 'none', textAlign: 'end' ,marginBottom:'80px' }}>Forgot Password ?</Link>
                                   </div>
                                    <div className='bloc-btn gap-10 flex-column d-flex'>
                                        <button className='w-100 d-flex align-items-center   justify-content-center gap-30   button  border border-1  p-2'><FcGoogle  /><span  className='text-light'  onClick={handleClick}  > SIGN IN WITH GOOGLE</span></button>
                                        <button className='w-100 text-center  button  p-2' type='submit' onClick={()=>navigate('/myrecette')}><span className='text-light' >Login</span></button>

                                    </div>

                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login
