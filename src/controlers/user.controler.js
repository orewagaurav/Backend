import asynchandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import ApiResponce from "../utils/ApiResponce.js";

const registerUser =  asynchandler(async (req,res)=> {
    
    const {fullName,email,username,password} = req.body
    console.log("email:",email);
    
    if(
        [fullName,email,username,password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400,"All fields are required");
    }

    const existedUser = await User.findOne({
        $or :[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User with this username or email already exists");
    }

    const avtarLocalPath = req.files?.avtar[0]?.path;
    const coverImageLoacalPath = req.files?.coverImage[0]?.path;

    if(!avtarLocalPath){
        throw new ApiError(400,"Avtar file is required");
    }

    const avtar = await uploadOnCloudinary(avtarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLoacalPath); 

    if(!avtar){
        throw new ApiError(400,"Avtar file is required");
    }

   const user = await User.create({
        fullName,
        avtar: avtar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })
    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500,"something went wrong in registering user");
    }

    return res.status(201).json(
        new ApiResponce(200,createdUser,"User registered")
    )

})

export default registerUser;