import {createSlice,createAsyncThunk, createAction} from '@reduxjs/toolkit'
import serviceauth from './authService' 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css'
  const getTokenFromStoorage = JSON.parse(localStorage.getItem('customer')) 
const initState = {
    user : getTokenFromStoorage,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:'',
    isLoagin:false
}
export const login = createAsyncThunk('/auth/login',async(data,thunkAPI)=>{
    try {
        return  await serviceauth.loginUser(data)
    } catch (error) {
      return  thunkAPI.rejectWithValue(error)
    }
})
export const createUser = createAsyncThunk('/auth/create',async(data,thunkAPI)=>{
    try {
        console.log(data)
        return  await serviceauth.createUser(data)
    } catch (error) {
      return  thunkAPI.rejectWithValue(error)
    }
})
export const resetState = createAction('resetState')
export const logout = createAction('logoutAction')
export const authSlice = createSlice({
    name:'auth',
    initialState:initState,
    reducers:{},
    extraReducers:(builder)=>{
      builder.addCase(createUser.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(createUser.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.registred = action.payload
        
        state.isLoagin=false
       
         
        
       
          toast.success("User Created Successfuly")
        
      })
      .addCase(createUser.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.isLoagin=false
        state.message=action.payload.response.data.msg
        toast.error("User Already Exist")
      })
      .addCase(login.pending,(state)=>{
        state.isLoading=true
      })
      .addCase(login.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.user = action.payload
        
        state.isLoagin=false
       
         
        
       
          toast.success("User Created Successfuly")
        
      })
      .addCase(login.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.isLoagin=false
        state.message=action.payload.response.data.msg
        toast.error("User Already Exist")
      })
      .addCase(logout,(state)=>{
        state.user = null
        state.isSuccess=true
        state.isError=false
        localStorage.clear()
        state.isLoagin=false
        window.open(`https://recette-mern-projects.vercel.app`,'_self')
      })
      .addCase(resetState,()=>initState)
     }

})
export default authSlice.reducer