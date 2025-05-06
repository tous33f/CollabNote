
import jwt from "jsonwebtoken"

const generateAccessToken=function(id){
    return jwt.sign(
        {
            id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            algorithm: "HS256"
        }
    )
}

const generateRefreshToken=function(id){
    return jwt.sign(
        {
            id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export {generateAccessToken,generateRefreshToken}