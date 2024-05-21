import mongoose from "mongoose";


const {Schema } = mongoose;

const userSchema = new Schema(
    {
        email:{
            type: String,
            unique: true,
            required: true,
        },
        password:{
            type:String,
            required: false,
        },
    },
    {timestamp:true}

);
export default mongoose.models.User || mongoose.model("user", userSchema);