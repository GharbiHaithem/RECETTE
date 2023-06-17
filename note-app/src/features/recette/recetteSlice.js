import {createAction, createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import servicerecette from './recetteService'
import {toast} from 'react-toastify'

const initState = {
recette:[],
isLoading:false,
isSuccess:false,
isError:false,
message:'',
titleRecette:'',
descriptionRecette:'',
categoryRecette:'',
imagesRecette:'',
isLoagin:false
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

export const updaterecette = createAsyncThunk('/recette/updated',async(data,thunkAPI)=>{
    try {
        return await servicerecette.updateRecette(data)
    } catch (error) {
        return thunkAPI.rejectWithValues(error)
    }
})
export const addRecetteToWishList = createAsyncThunk('/recette/addWishlist',async(data,thunkAPI)=>{
    try {
        return await servicerecette.addwishlist(data)
    } catch (error) {
        return thunkAPI.rejectWithValues(error)
    }
})
export const getAllWishList = createAsyncThunk('/recette/getWish',async(thunkAPI)=>{
    try {
        return await servicerecette.getWishList()
    } catch (error) {
        return thunkAPI.rejectWithValues(error)
    }
})
export const resetAllRecette = createAction('resetAllRecettes')
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
            state.recette=action.payload.recettes
            state.pagination=action.payload.pagination
            state.isLoagin=true
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
                state.titleRecette=action.payload.title
                state.descriptionRecette=action.payload.description
                state.categoryRecette=action.payload.category
                state.imagesRecette = action.payload.images
                state.onerecette=action.payload
             
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
                    toast.success("Recette deleted successfuly")
                 
                 })
                 .addCase(deleteRecette.rejected,(state,action)=>{
                  
                    state.isLoading=false
                    state.isSuccess=false
                    state.isError=true
                   
                 }).addCase(resetAllRecette,(state)=>{
                    state.titleRecette=''
                    state.descriptionRecette=''
                    state.categoryRecette=''

                 })
                 .addCase(updaterecette.pending,(state)=>{
                    state.isLoading=true
                     })
                     .addCase(updaterecette.fulfilled,(state,action)=>{
                        console.log(action.payload)
                        state.isLoading=false
                        state.isSuccess=true
                        state.recetteupdated=action.payload
                     
                     })
                     .addCase(updaterecette.rejected,(state,action)=>{
                      
                        state.isLoading=false
                        state.isSuccess=false
                        state.isError=true
                       
                     })
                     .addCase(addRecetteToWishList.pending,(state)=>{
                        state.isLoading=true
                         })
                         .addCase(addRecetteToWishList.fulfilled,(state,action)=>{
                         
                            console.log(action.payload)
                            state.isLoading=false
                            state.isSuccess=true
                            state.wishlist=action.payload
                         
                         })
                         .addCase(addRecetteToWishList.rejected,(state,action)=>{
                          
                            state.isLoading=false
                            state.isSuccess=false
                            state.isError=true
                           
                         })
                         .addCase(getAllWishList.pending,(state)=>{
                            state.isLoading=true
                             })
                             .addCase(getAllWishList.fulfilled,(state,action)=>{
                             
                                console.log(action.payload)
                                state.isLoading=false
                                state.isSuccess=true
                                state.wishlists=action.payload
                             
                             })
                             .addCase(getAllWishList.rejected,(state,action)=>{
                              
                                state.isLoading=false
                                state.isSuccess=false
                                state.isError=true
                               
                             })
                 
    }
})
export default recetteSlice.reducer;