import { Navigate } from "react-router-dom"
export const OpenRoute =({children})=>{
const getTokenFromStorage = JSON.parse(localStorage.getItem('customer'))
    return getTokenFromStorage?.token === undefined ? children : <Navigate  to={'/'} replace={true} />
}