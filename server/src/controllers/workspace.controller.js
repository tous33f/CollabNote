
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/AsyncHandler.js"
import {prisma} from "../db/connection.js"

const createWorkspace=asyncHandler(async (req,res)=>{
    const {name}=req.body
    const {id}=req?.user
    let workspace=await prisma.workspace.create({
        data:{
            name,owner_id:id
        }
    })
    await prisma.workspace_Members.create({
        data:{
            user_id: id,
            workspace_id: workspace.id,
            role: "admin"
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Workspace created successfully",workspace)
    )
})

const getWorkspace=asyncHandler(async(req,res)=>{
    const {id}=req?.user
    let workspaces=await prisma.workspace_Members.findMany({
        where:{
            user_id: id
        },
        select:{
            role: true,
            workspace: true
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Workspaces fetched successfully",workspaces)
    )
})

const joinWorkspace=asyncHandler(async(req,res)=>{
    const {workspace_id}=req.params
    const user_id=req?.user?.id
    if(!workspace_id){
        throw new ApiError(401,"Workspace id is required")
    }
    let user,workspace
    user=await prisma.user.findUnique({where:{id: user_id}})
    if(!user){
        throw new ApiError(401,"User does not exist")
    }
    workspace=await prisma.workspace.findUnique({where:{id: workspace_id}})
    if(!workspace){
        throw new ApiError(401,"Workspace does not exist")
    }
    let is_member=await prisma.workspace_Members.findUnique({where:{user_id,workspace_id}})
    if(is_member){
        throw new ApiError(201,"User is already member of the workspace")
    }
    is_member=await prisma.workspace_Members.create({
        data:{
            user_id,workspace_id,role: "member"
        }
    })
    res.status(201).json(
        new ApiResponse(201,"User is now member of the workspace",is_member)
    )
})

const removeFromWorkspace=asyncHandler(async(req,res)=>{
    const {workspace_id}=req.params
    const {user_id}=req.body
    const {id}=req?.user?.id
    if(!workspace_id || !user_id){
        throw new ApiError(401,"Workspace id and user id is required")
    }
    let user,workspace
    user=await prisma.user.findUnique({where:{id: user_id}})
    if(!user){
        throw new ApiError(401,"User does not exist")
    }
    workspace=await prisma.workspace.findUnique({where:{id: workspace_id}})
    if(!workspace){
        throw new ApiError(401,"Workspace does not exist")
    }
    let is_member=await prisma.workspace_Members.findUnique({where:{user_id,workspace_id}})
    if(!is_member){
        throw new ApiError(201,"User is already not member of the workspace")
    }
    await prisma.task.updateMany({
        where:{
            assignee_id: user_id,
            project:{
                workspace_id
            }
        },
        data:{
            assignee_id: null
        }
    })
    await prisma.workspace_Members.delete({
        where:{
            workspace_id,user_id
        }
    })
    res.status(201).json(
        new ApiResponse(201,"User removed of the workspace")
    )
})

const workspaceMembers=asyncHandler(async(req,res)=>{
    let {workspace_id}=req.params
    workspace_id=parseInt(workspace_id)
    const {id}=req.user
    if(!workspace_id){
        throw new ApiError(401,"Workspace id is not given")
    }
    const members=await prisma.workspace_Members.findMany({
        where:{
            workspace_id
        },
        include:{
            user:{
                select:{
                    id:true,
                    name: true,
                    email: true,
                    createdAt:true
                }
            }
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Members fetched successfully",members.map(member=>{
            return {...member?.user,role:member?.role}
        }))
    )
})

const updateMemberRole=asyncHandler(async(req,res)=>{
    let {workspace_id}=req.params
    let {user_id,role}=req.body
    const {id}=req?.user?.id
    workspace_id=parseInt(workspace_id)
    user_id=parseInt(user_id)
    if(!workspace_id || !user_id || !role){
        throw new ApiError(401,"Workspace id,user id and updated role is required")
    }
    let user,workspace
    user=await prisma.user.findUnique({where:{id: user_id}})
    if(!user){
        throw new ApiError(401,"User does not exist")
    }
    workspace=await prisma.workspace.findUnique({where:{id: workspace_id}})
    if(!workspace){
        throw new ApiError(401,"Workspace does not exist")
    }
    let is_member=await prisma.workspace_Members.findUnique({where:{user_id_workspace_id:{user_id,workspace_id}}})
    if(!is_member){
        throw new ApiError(201,"User is already not member of the workspace")
    }
    // check if the tne updating is an admin
    // user=await prisma.workspace_Members.findUnique({where:{user_id_workspace_id:{user_id:id,workspace_id}}})
    // if(!user){
    //     throw new ApiError(401,"User does not exist")
    // }
    // else if(user.role!="admin"){
    //     throw new ApiError(401,"You do not have privelige to change any members role")
    // }
    user=await prisma.workspace_Members.update({
        where:{
            user_id_workspace_id:{
                user_id,workspace_id
            }
        },
        data:{
            role
        },
        include:{
            user:{
                select:{
                    id:true,name:true,email:true,createdAt:true
                }
            }
        }
    })
    res.status(201).json(
        new ApiResponse(201,"User removed of the workspace",{...user?.user,role:user.role})
    )
})

export {
    createWorkspace,
    getWorkspace,
    joinWorkspace,
    workspaceMembers,
    removeFromWorkspace,
    updateMemberRole
}
