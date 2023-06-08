import React, { useEffect, useState } from 'react'
import { MdOutlineVerticalAlignTop } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import getAllRecettes from '../../features/recette/recetteSlice'
import RecetteCard from '../../Component/RecetteCard'

import './style.css'
import Pagination from '../../Component/Pagination'

const ListRecette = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostPerPage] = useState(3)
   
    const lastPostIndex = currentPage * postsPerPage
    const firstPostIndex = lastPostIndex - postsPerPage
    const [showButton, setShowButton] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 50) {
                setShowButton(true)
            } else {
                setShowButton(false)
            }
        }

        console.log(showButton)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)

    }, [showButton])
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const recetteState = useSelector(state => state?.recette?.recette)
    console.log(recetteState)
    const statePagination = useSelector(state=>state?.recette?.pagination)
   const currentPost = recetteState.slice(firstPostIndex,lastPostIndex)

    return (
        <div className='list-recette-wrapper position-relative'>
            <div className='container'>
                <div className='row'>

                    {
                        currentPost && currentPost?.map((item, index) => {
                            return (<>
                                <div className='col-md-4' key={index}>
                                    <RecetteCard item={item} />
                                </div>
                            </>)
                        })
                    }
                </div>
               
                <Pagination totalPosts={recetteState?.length}  postsPerPage={postsPerPage} setCurrentPage={setCurrentPage}/>
            </div>
            {showButton && <div style={{ bottom: 50, right: 50, position: 'fixed' }}>
                <button style={{ width: '100%', padding: '5px', borderRadius: '50%' }} onClick={scrollToTop}><MdOutlineVerticalAlignTop className='fs-3' /></button>
            </div>}
         
        </div>


    )
}

export default ListRecette
