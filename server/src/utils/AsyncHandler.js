import { ZodError } from "zod"
import { ApiResponse } from "./ApiResponse.js"

const asyncHandler=callback=>async(req,res,next)=>{
    try{
        await callback(req,res,next)
    }
    catch(err){
        console.log(err.message)
        err.statusCode=err.statusCode || 500
        res.status(err.statusCode).json(
            new ApiResponse(err.statusCode,err.message,null)
        )
    }
}

export {asyncHandler}