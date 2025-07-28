import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    userName:{
        type:String,
        required :true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    role:{
        type:String,
        required : true,
        default:"NORMAL",
    },
   },

   {timestamps:true}
);

    


const USER=mongoose.model("user",userSchema)
export { USER };