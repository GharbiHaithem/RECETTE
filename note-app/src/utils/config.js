
const getTokenFromStorage = JSON.parse(localStorage.getItem("customer")) ;

const token = getTokenFromStorage.token || ''
export const config = {
  

 
    headers:{
        Authorization:`Bearer ${token} ? ${token} : '' `,

   
   }
}