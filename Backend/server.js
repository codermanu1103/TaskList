import Task from "./models/Task.js";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Database connected"))
    .catch((err)=> console.log(err));

app.post("/api/tasks/", async (req,res)=>{
    try{
        const newTask=await Task.create(req.body.task);
        res.json(newTask);
    } catch {
        res.status(500).json({error:"Write Failed"});
    }
});

app.get("/api/tasks", async (req,res)=>{
    try {
        const tasks=await Task.find();
        res.json(tasks);
    } catch {
        res.status(500).json({error:"Read Failed"});
    }
});

app.put("/api/tasks/:id", async (req,res)=>{
    try {
        const updated = await Task.findByIdAndUpdate(
            req.params.id,
            {task:req.body.editedTask}
        );
        res.json(updated);
    } catch {
        res.status(500).json({error:"Updation Failed"});
    }
});

app.delete("/api/tasks/:id", async (req,res)=>{
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({success: true});
    } catch {
        res.status(500).json({error:"Deletion Failed"});
    }
});

app.listen(process.env.PORT || 4000,()=>{
    console.log("Server is running on port 5000")
});











/*
// Code for if we are editing in the local file only
import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());

const FilePath="./StoredTask.json";

app.get("/api/tasks",async (req, res)=>{
    try{
        const data=await fs.readFile(FilePath,"utf-8");
        res.json(JSON.parse(data));        
    } catch {
        res.status(500).json({error:"Read Failed"});
    }
});

app.put("/api/tasks/:id", async (req,res)=>{
    try{
        const data=await fs.readFile(FilePath,'utf-8');
        const tasks=JSON.parse(data);

        const updatedTasks=tasks.map(task=>
            task.id===req.params.id?{...task,'task':req.body.editedTask}:task
        );

        await fs.writeFile(FilePath,JSON.stringify(updatedTasks,null,2));
        res.json({success:true});
    } catch {
        res.status(500).json({error:"task edition is failed"})
    }
});

app.post("/api/tasks", async (req, res)=>{
    try{
        const data= await fs.readFile(FilePath,"utf-8");
        const tasks=JSON.parse(data);
        tasks.push(req.body.task);

        await fs.writeFile(FilePath,JSON.stringify(tasks,null,2));
        res.json({success:true});
    } catch {
        res.status(500).json({error:"Write Failed"});
    }
});

app.delete("/api/tasks/:id", async (req, res)=>{
    try{
        const data=await fs.readFile(FilePath,"utf-8");
        const tasks=JSON.parse(data);

        const updatedTasks=tasks.filter(task=>
            task.id!==req.params.id
        );

        await fs.writeFile(FilePath, JSON.stringify(updatedTasks,null,2));
        res.json({success:true});        
    } catch {
        res.status(500).json({error:"task deleteion is failed"});
    }
});

app.listen(5000, ()=>{
    console.log("Backend is running on port 5000");
});
*/