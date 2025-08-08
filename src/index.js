import dotenv from 'dotenv'
import connectDB from "./db/datbase.js";

connectDB();

dotenv.config({
    path:"./env"
})
