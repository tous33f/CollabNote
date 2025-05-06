import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import workspaceSlice from "../features/workspaceSlice";
import projectSlice from "../features/projectSlice"

const store=configureStore({
    reducer:{
        user: userSlice,
        workspace: workspaceSlice,
        project: projectSlice
    }
})

export default store
