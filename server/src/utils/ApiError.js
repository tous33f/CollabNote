class ApiError extends Error{
    constructor(statusCode,message="Error occured!"){
        super(message)
        this.message=message
        this.statusCode=statusCode
        this.data=null
    }
}

export {ApiError}