import { createSlice } from "@reduxjs/toolkit";

const navigationSlice = createSlice({
    name:'navigation',
    initialState:{
        navigationState:true
    },
    reducers:{
        shownTabNavigation:(state,action)=>{
            // if(state.navigationState ===true) return null
            state.navigationState = true
        },
        hiddenTabNavigation:(state,action)=>{
            state.navigationState = false
        }
    }
})

export default navigationSlice.reducer
export const {shownTabNavigation,hiddenTabNavigation} = navigationSlice.actions

export const tabNavigationState = state => state.navigationSlice.navigationState


