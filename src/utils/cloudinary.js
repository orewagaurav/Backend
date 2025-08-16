import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
//configuration
cloudinary.config(
    {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    }
);

const uploadOnCloudinary = async (localFilePath)=> {
    try {
        if(!localFilePath) return null;
        //else upload the file on the cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type : "auto"
        })
        //file has uploaded sucessfully
        console.log("File uploaded on cloudinary",response.url);
        return response;
        
    } catch (error) {
        fs.unlink(localFilePath, (err) => { if(err) console.log(err); }) //remove the locally saved temporairly files
        return null;
    }
}
export default uploadOnCloudinary;