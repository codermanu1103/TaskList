import React from "react";
import TaskBar from "./TaskBar";
import TaskList from "./TaskList";
import {nanoid} from "nanoid";

const api=import.meta.env.VITE_API_URL;

function TaskApp() {
    const [taskInList,setTaskInList]=React.useState([]);

    const fetchTasks= async ()=>{
        const res=await fetch(`${api}/api/tasks`);
        const data=await res.json();
        setTaskInList(data);
    }

    React.useEffect(()=>{
        fetchTasks();
    },[]);

    const addTaskToList=async (task)=>{
        const taskWithID={
            id:nanoid(),
            task:task
        };

        await fetch(`${api}/api/tasks`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify({task:taskWithID})
        });
        fetchTasks();
    };

    const deleteTask=async (id)=>{
        await fetch(`${api}/api/tasks/${id}`,{
            method:"DELETE"
        });
        fetchTasks();
    };

    const editTask=async (id, editedTask)=>{
        await fetch(`${api}/api/tasks/${id}`,{
            method:"PUT",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({'editedTask':editedTask})
        });
        fetchTasks();
    };

    return (
        <>
            <TaskBar addTaskToList={addTaskToList}/>
            <TaskList 
                taskInList={taskInList}
                deleteTask={deleteTask}
                editTask={editTask}
            />            
        </>
    );
}

export default TaskApp;