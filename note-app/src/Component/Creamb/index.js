import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const Creamb = ({title}) => {
    return (
        <div className='creamb py-4'>
        <div className='container'>
            <div className='row'> 
                <div className='col-12'>
               <p className='creambtext'>
               <Link to='/' className='text-dark'>
                  Home&nbsp;/{title}
                </Link>
               </p>
                
                </div>
            </div>
        </div>
        </div>
    )
}

export default Creamb
