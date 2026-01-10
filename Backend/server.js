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
        tasks.push(req.body);

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