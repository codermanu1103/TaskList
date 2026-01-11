import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true
    },
    task:{
        type:String
    }
});

export default mongoose.model("Task",taskSchema);