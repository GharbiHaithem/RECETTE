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
        thunkAPI.rejectWithValue(error)
    }
})
export const createUser = createAsyncThunk('/auth/create',async(data,thunkAPI)=>{
    try {
        console.log(data)
        return  await serviceauth.createOrUpdateUser(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})
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
        state.user = action.payload
        state.isLoagin=true
        localStorage.setItem('customer',JSON.stringify(action.payload))
      })
      .addCase(createUser.rejected,(state,action)=>{
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.isLoagin=false
        state.message=action.payload.responsa.data.message
      })
      .addCase(logout,(state)=>{
        state.user = null
        state.isSuccess=true
        state.isError=false
        localStorage.clear()
        state.isLoagin=false
        window.open(`http://localhost:3000`,'_self')
      })
     }

})
export default authSlice.reducer