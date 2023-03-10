import {createSlice} from "@reduxjs/toolkit"
let result = localStorage.getItem('auth');

const initialState = {
  user: result ? JSON.parse(result) : null
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        loginUser: (state,action) => {
         state.user = action.payload
            
        },
        logoutUser: (state) => {
            state.loading = false
        }
    }
})

export const {loginUser, logoutUser} = authSlice.actions
export default authSlice.reducer