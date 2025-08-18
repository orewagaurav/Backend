import asynchandler from "../utils/asyncHandler.js";

const registerUser =  asynchandler(async (requestAnimationFrame,res)=> {
    res.status(200).json({
        message:"ok"
    })
})