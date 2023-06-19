import { Navigate } from "react-router-dom"
export const PrivateRoute =({children})=>{
const getTokenFromStorage =localStorage.getItem('customer') && JSON.parse(localStorage.getItem('customer'))
   return getTokenFromStorage !== null ? children : (<Navigate  to={'/'} replace={true} />)
}