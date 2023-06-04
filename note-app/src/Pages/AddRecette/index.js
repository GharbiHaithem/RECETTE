import React, { useEffect, useRef, useState } from 'react'
import Creamb from '../../Component/Creamb'
import CustomerInput from '../../Component/CustomerInput'
import './style.css'
import { HiOutlineViewGridAdd } from 'react-icons/hi'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone'
import { MdCancel } from 'react-icons/md'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { deleteImg, upload } from '../../features/upload/upload.Slice'
import { IoIosCloseCircleOutline } from 'react-icons/io'
import FormModal from '../../Component/ModalForm'
import { getAllCat } from '../../features/category/categorySlice'
import { createRecette, getAllRecettes } from '../../features/recette/recetteSlice'
import {useNavigate, useParams} from 'react-router-dom'
const AddRecette = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate() 
    let schema = Yup.object().shape({
        title: Yup.string().required('title is required'),
        // category: Yup.string().required('category is required'),
        description: Yup.string().required('description is required').min(50).max(1000)
    })
    const recetteState = useSelector(state=>state?.recette?.oneRecette)
    const {title,description,category,images} = recetteState
    const formik = useFormik({
        initialValues: {
            title: title || "",
            category:category || "",
            description: description || '',
            images:images || ""
        },
        enableReinitialize:true,
        validationSchema: schema,
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2))
            dispatch(createRecette(values))
          
           
          formik.resetForm()
          setTimeout(()=>{
            dispatch(getAllRecettes())
           navigate('/myrecette/recette-list')
          },400)
        }
    })
    
    useEffect(() => {
        dispatch(getAllCat())
       
     
      
           
    }, [dispatch])
    // useEffect(()=>{
    //     if(navigated){
    //         navigate('/recette-list')
    //     }
    // },[navigate,navigated])
  
    const handleImg = (e) => {
        e.map((i) => {
            return (
                (i.type.includes('jpeg')) ? dispatch(upload(e)) : setErrorMsg(true)
            )
        }
        )
    }
    const uploadState = useSelector(state => state?.upload?.images)
    const categoryState = useSelector(state => state?.category?.category)
    console.log(categoryState)
    let img = []
    uploadState?.forEach(element => {
        img.push({
            public_id: element.public_id,
            url: element.url
        })

    });

    useEffect(() => {
        formik.values.images = img;
    }, [formik.values, img])
    const [errorMsg, setErrorMsg] = useState(false)
    const [open, setOpen] = useState(false)
    const showForm = () => {
        setOpen(true)
    }
    const closeForm = () => {
        setOpen(false)
    }

   const {id} = useParams()
    return (
        <>
            <Creamb title={id !== undefined ? "Update Recette" : "Add Recette"} />
            <div className='recette-wrapper gap-20'  >


                <form className='formrecette d-flex flex-column gap-10' onSubmit={formik.handleSubmit}>

                    <div> <CustomerInput placeholder={'Enter title recette'} name={'title'} onChange={formik.handleChange('title')} value={formik.values.title} className={'input-form'} />
                        {formik.touched.title && formik.errors.title}
                    </div>
                    <div className='d-flex gap-20'>
                        <select name='category' onChange={formik.handleChange('category')} value={formik.values.category} className="form-select" aria-label="Default select example">
                            <option >Selectionner la Category de votre recette</option>
                            {categoryState && categoryState?.map((cat, index) => {
                                return (<option key={index} >{cat?.title}</option>)
                            })}
                        </select>
                        <button onClick={showForm} className='buttonModal flex-grow-1 p-2'><HiOutlineViewGridAdd /></button>
                        {/* {formik.touched.category && formik.errors.category} */}
                    </div>
                    <div> <ReactQuill theme="snow" name='description' onChange={formik.handleChange('description')} value={formik.values.description} />
                        {formik.touched.description && formik.errors.description}
                    </div>

                    <div className='my-5 '>
                        <Dropzone onDrop={acceptedFiles => handleImg(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p style={{ boxShadow: '0 0 10px #ddd p-5' }}>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                        {errorMsg && <div className='d-flex align-items-center justify-content-between gap-20 badge bg-secondary text-light p-2'><span >Error Type Image &nbsp; </span><span><MdCancel onClick={() => setErrorMsg(false)} style={{ color: 'white', fontSize: '17px' }} /></span></div>}
                    </div>
                    <button type='submit' className='button text-light p-2 fs-6'>{id !== undefined ? "UPDATE RECETTE" : "ADD RECETTE"}</button>
                    {open && <FormModal onClose={closeForm} setOpen={setOpen} />}
                </form>
                <div className='d-flex flex-column gap-30 x'>
                    {uploadState && uploadState?.map((img, index) => {
                        return (<div key={index} className='position-relative box-img' style={{ boxShadow: '0 0 10px #ddd' }}>
                            <div className='position-absolute cancel' style={{}}>
                                <IoIosCloseCircleOutline className='p-1 fs-2 text-dark' style={{ float: 'right' }} onClick={() => dispatch(deleteImg(img?.public_id))} />
                            </div>
                            <img src={img?.url} style={{ width: '100%', height: '200px', borderRadius: '', objectFit: 'cover' }} className='img-fluid' alt={img?.public_id} />
                        </div>
                        )
                    })}
                </div>

            </div>
        </>
    )
}

export default AddRecette
