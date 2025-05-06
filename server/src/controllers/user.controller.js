
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/AsyncHandler.js"
import {prisma} from "../db/connection.js"
import { UserValidator } from "../validators/user.validator.js";
import { schemaValidator } from "../utils/SchemaValidator.js";
import { generateAccessToken } from "../utils/TokenGenerator.js"
import { z } from "zod";

const registerUser=asyncHandler( async(req,res)=>{
    let user

    //check if all fields are given
    schemaValidator(UserValidator.register())(req)
    const {name,email,password}=req.body

    //check if user already exists
    user=await prisma.user.findUnique({
        where: {
            email
        }
    })
    if(user){
        throw new ApiError(401,"User already exists on given email")
    }

    user=await prisma.user.create({
        data:{
            email,name,password
        },
    })

    let workspace=await prisma.workspace.create({
        data:{
            name: "Persoanl",
            owner_id: user.id
        }
    })

    await prisma.workspace_Members.create({
        data:{
            user_id: user.id,
            workspace_id: workspace.id,
            role: "admin"
        }
    })

    //return response to user
    res.status(201).json(
        new ApiResponse(201,"User created successfully",user)
    )
} )

const loginUser=asyncHandler( async(req,res)=>{
    let user
    // check for password,username or email
    schemaValidator(UserValidator.login())(req)
    const {email,password}=req.body

    //check if user already exists
    user=await prisma.user.findUnique({
        where: {
            email
        },
    })
    if(!user){
        throw new ApiError(401,"User does not exist")
    }
    console.log(user)
    
    // check if password is correct or not
    if( user.password!=password ){
        throw new ApiError(403,"Password is incorrect")
    }

    // generate access and refresh tokens
    let access
    try{
        access=generateAccessToken(user.id)
    }
    catch(err){
        throw new ApiError(401,`Error while creating access token: ${err.message} `)
    }
    delete user.password

    res.status(201)
    .cookie("accessToken",access,{httpOnly: true,secure: false, maxAge: 1000*60*60*24 })
    .json(
        new ApiResponse(201,"User logged in successfully",user )
    )
} )

const logoutUser=asyncHandler(async(req,res)=>{
    // get user object from request
    const user=req.user
    // clear acces and refresh token cookies
    res.status(201).clearCookie("accessToken").json(
        new ApiResponse(201,"User logged out successfully",{})
    )
} )

const getUser=asyncHandler( async(req,res)=>{
    let user
    // get user object from request
    const {id}=req.user
    //query db
    user=await prisma.user.findUnique({
        where:{
            id
        },
        omit:{
            password: true
        }
    })
    res.status(201).json(
        new ApiResponse(201,"User fetched successfully",user)
    )
} )

const updateName=asyncHandler(async(req,res)=>{
    const {name}=req.body;
    if(!name){
        throw new ApiError(401,"Updated name is not provided")
    }
    const {id}=req?.user;
    let user=await prisma.user.update({
        where:{
            id
        },
        data:{
            name,
        },
        omit:{
            password: true
        }
    })
    res.status(201).json(
        new ApiResponse(201,"User updated successfully",user)
    )
})

const updateEmail=asyncHandler( async(req,res)=>{
    const {email}=req.body;
    if(!email){
        throw new ApiError(401,"Updated email is not provided")
    }
    const shcema=z.string().email().safeParse(email)
    if(!shcema.success){
        throw new ApiError(401,"Email is invalid")
    }
    const {id}=req?.user;

    let user
    user=await prisma.user.findUnique({
        where:{
            email
        }
    })
    if(user){
        throw new ApiError(401,"Email has already been taken")
    }
    user=await prisma.user.update({
        where:{
            id
        },
        data:{
            email,
        },
        omit:{
            password: true
        }
    })
    res.status(201).json(
        new ApiResponse(201,"User updated successfully",user)
    )
} )

const updatePassword=asyncHandler(async(req,res)=>{
    const {password}=req.body;
    if(!password){
        throw new ApiError(401,"Updated name is not provided")
    }
    const {id}=req?.user;
    let user=await prisma.user.update({
        where:{
            id
        },
        data:{
            password
        },
        omit:{
            password: true
        }
    })
    res.status(201).json(
        new ApiResponse(201,"User updated successfully",user)
    )
})

export {registerUser,loginUser,logoutUser,getUser,updateName,updateEmail,updatePassword}
