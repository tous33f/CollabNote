import { createSlice } from "@reduxjs/toolkit";

const initialState={
    project: null
}

const projectSlice=createSlice({
    name: "project",
    initialState,
    reducers:{
        select:(state,action)=>{
            state.project=action.payload
        }
    }
})

export default projectSlice.reducer
export const {select}=projectSlice.actions
