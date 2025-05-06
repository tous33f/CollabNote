
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/AsyncHandler.js"
import {prisma} from "../db/connection.js"
import { TaskValidator } from "../validators/task.validator.js";
import { schemaValidator } from "../utils/SchemaValidator.js";

const createTask=asyncHandler(async(req,res)=>{
    schemaValidator(TaskValidator.create())(req)
    const {title,due_date,assignee_id,status,project_id}=req.body
    const {id}=req?.user
    let project=await prisma.project.findUnique({
        where:{
            id: project_id,
        }
    })
    if(!project){
        throw new ApiError(401,"Project does not exist")
    }
    const is_member=await prisma.workspace_Members.findUnique({
        where:{
            user_id_workspace_id:{
                user_id: id,
                workspace_id:  project.workspace_id
            }
        }
    })
    if(!is_member){
        throw new ApiError(401,"User is not member of workspace")
    }
    let task=await prisma.task.create({
        data:{
            title,due_date,assignee_id,project_id,status
        },
        include:{
            project:{
                select:{
                    id: true,
                    name: true
                }
            },
            assignee:{
                select:{
                    id: true,
                    name: true
                }
            }
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Task created successfully",task)
    )
})

const editTask=asyncHandler(async(req,res)=>{
    schemaValidator(TaskValidator.edit())(req)
    const {id,project_id}=req.body
    const data=req.body
    delete data[id]
    const user_id=req?.user?.id
    let project=await prisma.project.findUnique({
        where:{
            id: project_id,
        }
    })
    if(!project){
        throw new ApiError(401,"Project does not exist")
    }
    const is_member=await prisma.workspace_Members.findUnique({
        where:{
            user_id_workspace_id:{
                user_id,
                workspace_id:  project.workspace_id
            }
        }
    })
    if(!is_member){
        throw new ApiError(401,"User is not member of workspace")
    }
    let task=await prisma.task.update({
        where:{
            id
        },
        data,
        include:{
            project:{
                select:{
                    id: true,
                    name: true
                }
            },
            assignee:{
                select:{
                    id: true,
                    name: true
                }
            }
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Task updated successfully",task)
    )
})

const deleteTask=asyncHandler(async(req,res)=>{
    const {task_id}=req.params
    const user_id=req?.user?.id
    const {project_id}=await prisma.task.findUnique({where:{id: parseInt(task_id)}})
    if(!project_id){
        throw new ApiError(401,"Task does not exist")
    }
    let project=await prisma.project.findUnique({
        where:{
            id: project_id,
        }
    })
    if(!project){
        throw new ApiError(401,"Project does not exist")
    }
    const is_member=await prisma.workspace_Members.findUnique({
        where:{
            user_id_workspace_id:{
                user_id,
                workspace_id:  project.workspace_id
            }
        }
    })
    if(!is_member){
        throw new ApiError(401,"User is not member of workspace")
    }
    // if(is_member.role!="admin"){
    //     throw new ApiError(401,"User is not permitted to delete task")
    // }
    await prisma.task.delete({
        where:{
            id: parseInt(task_id)
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Task deleted successfully")
    )
})

const workspaceTasks=asyncHandler(async(req,res)=>{
    let {workspace_id}=req.params
    workspace_id=parseInt(workspace_id)
    let projects=await prisma.workspace.findUnique({
        where:{
            id: workspace_id
        },
        select:{
            projects:{
                select:{
                    tasks:{
                        select:{
                            id: true,
                            title: true,
                            due_date: true,
                            description: true,
                            status:true,
                            assignee:{
                                select:{
                                    id:true,
                                    name: true
                                }
                            },
                            project:{
                                select:{
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            }
        }
    })
    let tasks=[]
    projects.projects.map(project=>{
        project.tasks.map(task=>{
            tasks.push(task)
        })
    })
    res.status(201).json(
        new ApiResponse(201,"Workspace tasks fetched successfully",tasks)
    )
})

const projectTasks=asyncHandler(async(req,res)=>{
    let {project_id}=req.params
    project_id=parseInt(project_id)
    let project=await prisma.project.findUnique({
        where:{
            id: project_id
        },
        select:{
            tasks:{
                select:{
                    id: true,
                    title: true,
                    due_date: true,
                    description: true,
                    status:true,
                    assignee:{
                        select:{
                            id:true,
                            name: true
                        }
                    },
                    project:{
                        select:{
                            id: true,
                            name: true
                        }
                    }
                }
            }
        }
    })
    res.status(201).json(
        new ApiResponse(201,"Project tasks fetched successfully",project.tasks)
    )
})

const userTasks=asyncHandler(async(req,res)=>{
    const {id}=req.user
    let tasks=await prisma.task.findMany({
        where:{
            assignee_id: id
        },
        select:{
            id: true,
            title: true,
            due_date: true,
            description: true,
            status:true,
            assignee:{
                select:{
                    id:true,
                    name: true
                }
            },
            project:{
                select:{
                    id: true,
                    name: true
                }
            }
        }
    })
    res.status(201).json(
        new ApiResponse(201,"User's tasks fetched succesfully",tasks)
    )
})

export {
    createTask,
    editTask,
    deleteTask,
    workspaceTasks,
    projectTasks,
    userTasks
}
