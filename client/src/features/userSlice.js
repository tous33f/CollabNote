import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState={
    loading:false,
    user: null,
    error: ""
}

export const fetchUser=createAsyncThunk("user/fetchUser",()=>{
    return axios.get("/api/u",{withCredentials: true})
    .then( res=>{
        const data=res?.data?.data
        return data
    } )
})

const userSlice=createSlice({
    name: "user",
    initialState,
    reducers:{
        logout: (state)=>{
            state.user=null
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUser.pending,(state)=>{
            state.loading=true
        })
        builder.addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        builder.addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
    }
})

export default userSlice.reducer
export const {logout}=userSlice.actions
