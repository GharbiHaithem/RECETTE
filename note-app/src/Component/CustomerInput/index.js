import React from 'react'
import './style.css'
const CustomerInput = ({title,className,type,placeholder,name,onChange,value}) => {
    return (
       <div className='form-group'>
        <label className='mb-3 title-text'>{title}</label>
            <input className={`${className} form-control `} value={value} onChange={onChange}  name={name} type={type} placeholder={placeholder} aria-label="default input example"/>
            </div>
    )
}

export default CustomerInput
