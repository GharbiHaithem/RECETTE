import React, { useEffect, useState } from 'react'
import CustomerInput from '../CustomerInput'
import { Link, useNavigate } from 'react-router-dom'
import './style.css'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { createUser, resetState } from '../../features/auth/authSlice'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const Register = () => {
    const navigate = useNavigate()
    const msgState = useSelector(state => state?.auth?.message)
    const isRegistred = useSelector(state => state?.auth?.isSuccess)
    const dispatch = useDispatch()
    let schema = Yup.object().shape({
        firstname: Yup.string().required('required').min(6).max(20),
        lastname:Yup.string().required('required').min(5).max(20),
        mobile:Yup.string().required('required mobile number'),
        email: Yup.string().required('required').email("Please Enter Email Valid"),
        password: Yup.string().required('Password Required').min(6).max(20)
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            firstname: '',
            lastname:'',
            mobile:''
        },
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
            dispatch(createUser(values))

            setTimeout(() => {
                formik.resetForm()
                dispatch(resetState())
            }, 4000)

        }


    })
    const [isScreenSmall, setIsScreenSmall] = useState(false);
    useEffect(() => {
        if (isRegistred === true) {
            setTimeout(() => {
                navigate('/')
            }, 2000)
        }
    }, [isRegistred, navigate])
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



    return (
        <div className='container'>
            <div className='register-wrapper '>


                <div className='row my-5 py-5'>


                    <div className='col-md-12  col-lg-12  col-sm-12 '  >
                        <div className='form-register d-flex flex-column ' >
                            <h5 className='text-center text-dark text-gradient'>Register</h5>
                            <hr />
                            <p className='text-center'></p>
                            <form className='d-flex flex-column gap-10 ' onClick={formik.handleSubmit}>

                                <CustomerInput type={'text'} title={'last Name'} name='lastname' placeholder={'last name'} value={formik.values.lastname} onChange={formik.handleChange('lastname')} />
                                {formik.touched.lastname && formik.errors.lastname && <span>{formik.errors.lastname}</span>}
                                <CustomerInput type={'text'} title={'First Name'} name='firstname' placeholder={'first name'} value={formik.values.firstname} onChange={formik.handleChange('firstname')} />
                                {formik.touched.lastname && formik.errors.lastname && <span>{formik.errors.lastname}</span>}
                                <CustomerInput type={'text'} title={'Mobile'} name='mobile' placeholder={'Mobile Number : '} value={formik.values.mobile} onChange={formik.handleChange('mobile')} />
                                {formik.touched.lastname && formik.errors.lastname && <span>{formik.errors.lastname}</span>}
                                <CustomerInput type={'email'} title={'Email'} name='email' placeholder={'Email ...'} value={formik.values.email} onChange={formik.handleChange('email')} />
                                {formik.touched.email && formik.errors.email && <span>{formik.errors.email}</span>}
                                <CustomerInput type={'password'} title={'Password'} name='password' className={'form-control'} placeholder={'Password'} value={formik.values.password} onChange={formik.handleChange('password')} />
                                {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                                {/* {message && <span className='badge bg-danger p-1'>{showMessage}</span>} */}


                                {msgState && <span className='badge bg-secondary p-3 text-xl-start fw-bold text-uppercase'>{msgState}</span>}
                                <div className='bloc-btn gap-10 flex-column d-flex'>

                                    <button className='w-100 text-center  button  p-2' type='submit'><span className='text-light' >Registre</span></button>

                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <ToastContainer
                position="top-right"
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
            {/* Same as */}
            <ToastContainer />
        </div>

    )
}

export default Register
