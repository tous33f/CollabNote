
import {z} from "zod"

export class UserValidator{
    static register(){
        return z.object({
            name: z.string({required_error: "Name is required", invalid_type_error:"Name must ba a string"}),
            email: z.string({required_error: "Email is required", invalid_type_error:"Email must ba a string"}).email({message:"Email is invalid"}),
            password: z.string({required_error: "Password is required", invalid_type_error:"Password must ba a string"}),
        })
    }
    static login(){
        return z.object({
            email: z.string({required_error: "Email is required", invalid_type_error:"Email must ba a string"}).email({message:"Email is invalid"}),
            password: z.string({required_error: "Password is required", invalid_type_error:"Password must ba a string"}),
        })
    }
}
