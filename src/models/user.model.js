import mongoose, {Schema} from "mongoose";
import bcrpt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxlength:50,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        maxlength:50,
        lowercase:true
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    avatar:{
        type:String, //aws s3
        required:true,
    },
    coverimage:{
        type:String, //aws s3
    },
    watchhistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"Video"
        }],
    password:{
        type:String,
        required:true,
        trim:true,
        maxlength:50
    },
    refreshToken:{
        type:String,
    },
},{timestamps:true});


userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    try {
        this.password = await bcrpt.hash(this.password,10);
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function(password){
    try {
        const isMatch = await bcrpt.compare(password,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
}

userSchema.methods.generateAccessToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id},process.env.JWT_ACCESS_TOKEN,{expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRE});
        return token;
    } catch (error) {
        throw error;
    }
}

userSchema.methods.generateRefreshToken = async function(){
    try {
        const token = await jwt.sign({_id:this._id},process.env.JWT_REFRESH_TOKEN,{expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRE});
        return token;
    } catch (error) {
        throw error;
    }
}

export const User = mongoose.model("User",userSchema);