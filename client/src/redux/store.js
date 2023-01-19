import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { authSlice } from "./authSlice";


const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;