import {z} from "zod"

export class TaskValidator{
    static create(){
        return z.object({
            title: z.string({
                invalid_type_error: "Task name should be string",
                required_error:"Task name is required"
            }),
            due_date: z.string().datetime({
                invalid_type_error: "Date must be a date type",
            }).optional(),
            assignee_id: z.number({invalid_type_error: "Assignee id must be a number"}).optional(),
            status: z.string().default("backlog"),
            project_id: z.number({
                required_error: "Project is must be given",
                invalid_type_error: "Project id must be a number"
            }),
            description: z.string().default("")
        })
    }
    static edit(){
        return z.object({
            id: z.number({required_error: "Task id is required",invalid_type_error: "Task id must be a number"}),
            title: z.string({
                invalid_type_error: "Task name should be string",
            }),
            due_date: z.string().datetime({
                invalid_type_error: "Date must be a date type",
            }),
            assignee_id: z.number({invalid_type_error: "Assignee id must be a number"}).nullable(),
            status: z.string({invalid_type_error: "Status must be a string"}),
            project_id: z.number({
                required_error: "Project id is required",
                invalid_type_error: "Project id must be a number"
            }),
            description: z.string({invalid_type_error: "Description must be a string"})
        }).partial().required({id: true, project_id: true})
    }
}