import { createSlice } from "@reduxjs/toolkit";

const initialState={
    workspace: null
}

const workspaceSlice=createSlice({
    name: "workspace",
    initialState,
    reducers:{
        select:(state,action)=>{
            state.workspace=action.payload
        }
    }
})

export default workspaceSlice.reducer
export const {select}=workspaceSlice.actions
