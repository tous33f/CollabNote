import { ApiError } from "./ApiError.js"

const schemaValidator=(shcema)=>(req=>{
    try{
        shcema.parse(req.body)
    }
    catch(err){
        throw new ApiError(403,(Array.isArray(err.errors) && err.errors.length>0)?(err.errors[0].message):("An error occured"))
    }
})

export {schemaValidator}