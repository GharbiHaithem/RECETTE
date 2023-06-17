import React, { useRef } from 'react'
import './style.css'
const ModalConfirm = ({showModal,closeModal,handleDelete}) => {
    const myElementRef = useRef(null)
    const handleClick = (event)=>{
        const myElement = myElementRef.current
     if(event.target.classList.contains(`${myElement.className}`)){
        closeModal()
     }
     }
  
    return (
        <div className='confirm_wrapper'  ref={myElementRef} onClick={handleClick}>
            <form className='form p-3'>
               
                    <h6 className='text-muted text-center' style={{fontSize:'16px',fontWeight:'600'}}> Vous etes sur d'avoir supprimé cette recette</h6>
                    <div className='d-flex justify-content-center gap-10 align-items-center my-5 py-1 w-100'>
                        <button className='btn btn-danger btn-sm w-50'  type='button' onClick={handleDelete}>Ok</button>
                        <button className='btn btn-primary btn-sm w-50' onClick={()=>closeModal()}>Cancel</button>
                    </div>
                
            </form>
        </div>
    )
}

export default ModalConfirm
