import React from 'react'
import './style.css'
import { useSelector } from 'react-redux'
const Pagination = ({totalPosts,postsPerPage,setCurrentPage,isScreenSmall}) => {
    const tooglestate = useSelector(state=>state?.toogle?.darkMode)
    let pages =[]
    for(let i = 1 ; i<=Math.ceil(totalPosts / postsPerPage) ;i++){
        pages.push(i)
    }
    return (
        <div className={`${tooglestate ? "pagination-mode-dark" : "pagination" } `}>
            {
                pages.map((page,index)=>{
                    return <button key={index} onClick={()=>setCurrentPage(page)}>{page}</button>
                })
            }
        </div>
    )
}

export default Pagination
