import express from "express";
import cookieParser from "cookie-parser";
const app=express()

app.use(express.json({
    limit: "16kb"
}))

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}))

app.use(cookieParser())

app.use(express.static("public"))

import userRoutes from "./routes/user.routes.js"
import workspaceRoutes from "./routes/workspace.routes.js"
import taskRoutes from "./routes/task.routes.js"
import projectRoutes from "./routes/project.routes.js"

app.use("/api/u",userRoutes)
app.use("/api/w",workspaceRoutes)
app.use("/api/p",projectRoutes)
app.use("/api/t",taskRoutes)

export default app
