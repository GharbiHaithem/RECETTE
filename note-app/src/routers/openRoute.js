import { Navigate } from "react-router-dom"
export const OpenRoute =({children})=>{
const getTokenFromStorage = JSON.parse(localStorage.getItem('customer'))
console.log(getTokenFromStorage)
    return getTokenFromStorage?.token === null  ? children : <Navigate  to={'/myrecette'} replace={true} />
}