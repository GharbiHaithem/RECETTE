import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import servicerecette from './recetteService'
import { useNavigate } from 'react-router-dom'

const initState = {
recette:[],
isLoading:false,
isSuccess:false,
isError:false,
message:''
}

export const createRecette = createAsyncThunk('/recette/created',async(data,thunkAPI)=>{
    try {
        console.log(data)
        return await servicerecette.createrecette(data)
    } catch (error) {
        return thunkAPI.rejectWithValues(error)
    }
})
export const getAllRecettes = createAsyncThunk('/recette/getAll',async(thunkAPI)=>{
    try {
       
        return await servicerecette.getAllrecette()
    } catch (error) {
        return thunkAPI.rejectWithValues(error)
    }
})

export const getRecette = createAsyncThunk('/recette/getOne',async(id,thunkAPI)=>{
    try {
        return await servicerecette.getrecette(id)
    } catch (error) {
        return thunkAPI.rejectWithValues(error)
    }
})
export const deleteRecette = createAsyncThunk('/recette/delete',async(id,thunkAPI)=>{
    try {
        return await servicerecette.delrecette(id)
    } catch (error) {
        return thunkAPI.rejectWithValues(error)
    }
})
export const recetteSlice = createSlice({
    name:'recette',
    initialState:initState,
    reducers:{},
    extraReducers:(builder)=>{
     builder.addCase(createRecette.pending,(state)=>{
    state.isLoading=true
     })
     .addCase(createRecette.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=true
        state.recetteCreated=action.payload
     })
     .addCase(createRecette.rejected,(state,action)=>{
        console.log(action.payload)
        state.isLoading=false
        state.isSuccess=false
        state.isError=true
        state.message=action.payload
     })
     .addCase(getAllRecettes.pending,(state)=>{
        state.isLoading=true
         })
         .addCase(getAllRecettes.fulfilled,(state,action)=>{
            console.log(action.payload)
            state.isLoading=false
            state.isSuccess=true
            state.recette=action.payload
         
         })
         .addCase(getAllRecettes.rejected,(state,action)=>{
          
            state.isLoading=false
            state.isSuccess=false
            state.isError=true
           
         })
         .addCase(getRecette.pending,(state)=>{
            state.isLoading=true
             })
             .addCase(getRecette.fulfilled,(state,action)=>{
                console.log(action.payload)
                state.isLoading=false
                state.isSuccess=true
                state.oneRecette=action.payload
             
             })
             .addCase(getRecette.rejected,(state,action)=>{
              
                state.isLoading=false
                state.isSuccess=false
                state.isError=true
               
             })
             .addCase(deleteRecette.pending,(state)=>{
                state.isLoading=true
                 })
                 .addCase(deleteRecette.fulfilled,(state,action)=>{
                    console.log(action.payload)
                    state.isLoading=false
                    state.isSuccess=true
                    state.DeletedRecette=action.payload
                 
                 })
                 .addCase(deleteRecette.rejected,(state,action)=>{
                  
                    state.isLoading=false
                    state.isSuccess=false
                    state.isError=true
                   
                 })
    }
})
export default recetteSlice.reducer;