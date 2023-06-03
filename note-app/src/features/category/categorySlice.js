import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import servicecat from './categoryService'
const initState={
isLoading : false,
isSuccess:false,
isError:false,
message:'',
category:[]
}
export const createCat = createAsyncThunk('category/create',async(data,thunkAPI)=>{
    try{
        console.log(data)
     return await  servicecat.createCategory(data)
    }catch(err){
     return  thunkAPI.rejectWithValue(err)
    }
})
export const getAllCat = createAsyncThunk('category/get',async(thunkAPI)=>{
    try{
       
     return await  servicecat.getCategories()
    }catch(err){
     return  thunkAPI.rejectWithValue(err)
    }
})
export const CatSlice = createSlice({
    name:'category',
    initialState:initState,
    reducer:{},
    extraReducers:(builder)=>{
        builder.addCase(createCat.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(createCat.fulfilled,(state,action)=>{
            state.isLoading=false
            state.categorycreated = action.payload
            state.isSuccess = true
            
        })
        .addCase(createCat.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.payload.message
        })
        .addCase(getAllCat.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllCat.fulfilled,(state,action)=>{
            state.isLoading=false
            state.category = action.payload
            state.isSuccess = true
            
        })
        .addCase(getAllCat.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.isSuccess=false
            state.message=action.payload
        })
    }
})
export default CatSlice.reducer