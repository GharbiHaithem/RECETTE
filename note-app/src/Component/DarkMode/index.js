import React, { useState } from 'react'
import './style.css'
import { FcSettings } from 'react-icons/fc'
const DarkMode = () => {
    const[open,setOpen] = useState(false)
    return (
        <div className={` ${open ? "open" :  "switch-mode"}`}>
            <div className='icons d-flex align-items-center justify-content-center' onClick={()=>setOpen(!open)}>
                <FcSettings className='fs-3'/>
            </div>
        </div>
    )
}

export default DarkMode
