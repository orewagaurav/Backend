import mongoose ,{Schema} from 'mongoose' 
import jst from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avtar:{
            type:String, //cloudinary url
            required:true,
        },
        coverImage:{
            type:String, //cloudinary url

        },
        watchHistory:[
            {
            type: Schema.Types.ObjectId,
            ref:"Video"
            }
        ],
        password:{
            type:String,
            required:[true,"password is reqired"]
        },
        refreshToken:{
            type:String
        }
    },
    {
        timestamps:true
    }
)

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
    }
)

userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare("password",this.password)
}

export const User = mongoose.model("User",userSchema)
  