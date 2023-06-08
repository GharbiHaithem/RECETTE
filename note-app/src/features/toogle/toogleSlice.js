import {createAction, createSlice} from '@reduxjs/toolkit'
const initialState={
    darkMode:false
}
export const basculeToogle = createAction('basculeToogle')
export const toogleSlice = createSlice({
    name:'toogle',
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(basculeToogle,(state)=>{
            state.darkMode=!state.darkMode
        })
    }
})
export default toogleSlice.reducer