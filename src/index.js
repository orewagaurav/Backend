import dotenv from 'dotenv'
import app from './app.js'
import connectDB from "./db/database.js";
dotenv.config({
    path:"./.env"
})

connectDB()
.then(()=>{
    app.on("error",(e)=>{
        console.log("Error: ",e);
        throw e
        
    })
    app.listen(process.env.PORT || 3000),()=>{
        console.log(`server is runing at port: ${process.env.PORT || 3000}`)
    }
})
.catch((e)=>{
    console.log("MongoDB connection error: ",e);
    
})


