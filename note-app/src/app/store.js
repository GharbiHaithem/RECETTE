import {configureStore} from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import uploadReducer from '../features/upload/upload.Slice'
import categoryReducer from '../features/category/categorySlice'
import recetteReducer from '../features/recette/recetteSlice'
export const store = configureStore({
    reducer:{
     auth:authReducer,
     upload:uploadReducer,
     category:categoryReducer,
     recette:recetteReducer
     
    },
})