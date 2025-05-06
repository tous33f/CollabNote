
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/AsyncHandler.js"
import {prisma} from "../db/connection.js"

const createProject=asyncHandler(async (req,res)=>{
    const {name,description}=req.body
    const {workspace_id}=req.params
    const {id}=req?.user
    let workspace=await prisma.workspace_Members.findUnique({
        where:{
            workspace_id,user_id: id
        }
    })
    if(workspace.role!="admin"){
        throw new ApiError(401,"User is not permitted to create project")
    }
    const project=await prisma.project.create({
        data:{
            name,description,workspace_id
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Project created successfully",project)
    )
})

const getWorkspaceProjects=asyncHandler(async(req,res)=>{
    let {workspace_id}=req.params
    workspace_id=parseInt(workspace_id)
    let {id}=req.user
    const is_member=await prisma.workspace_Members.findUnique({where:{
        user_id_workspace_id:{
            user_id: id,workspace_id
        }
    }})
    if(!is_member){
        throw new ApiError(401,"User is not member of workspace so cannot access workspace projects")
    }
    const projects=await prisma.workspace.findUnique({
        where:{
            id: workspace_id
        },
        select:{
            projects: true
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Workspace projects fetched successfully",projects.projects)
    )
})

const getProject=asyncHandler(async(req,res)=>{
    const {project_id}=req.params
    const {id}=req.user
    const is_member=await prisma.workspace_Members.findUnique({where:{user_id: id,workspace_id}})
    if(!is_member){
        throw new ApiError(401,"User is not member of workspace so cannot access workspace projects")
    }
    const project=await prisma.project.findUnique({where:{id: project_id}})
    res.status(201).json(
        new ApiResponse(201,"Workspace projects fetched successfully",project)
    )
})

export {
    createProject,
    getProject,
    getWorkspaceProjects
}