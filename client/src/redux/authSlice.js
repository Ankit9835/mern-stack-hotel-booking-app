import {createSlice} from "@reduxjs/toolkit"

const initialState = {
   name:'',
   role:''
  }

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginUser: (state) => {
         state.name = 'Ankit'
            
        },
        logoutUser: (state) => {
            state.loading = false
        }
    }
})

export const {loginUser, logoutUser} = authSlice.actions
export default authSlice.reducer