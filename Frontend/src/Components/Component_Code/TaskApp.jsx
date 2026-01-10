import React from "react";
import TaskBar from "./TaskBar";
import TaskList from "./TaskList";
import {nanoid} from "nanoid";

function TaskApp() {
    const [taskInList,setTaskInList]=React.useState([]);

    const fetchTasks= async ()=>{
        const res=await fetch("http://localhost:5000/api/tasks");
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

        await fetch("http://localhost:5000/api/tasks",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(taskWithID)
        });
        fetchTasks();
    };

    const deleteTask=async (id)=>{
        await fetch(`http://localhost:5000/api/tasks/${id}`,{
            method:"DELETE"
        });
        fetchTasks();
    };

    const editTask=async (id, editedTask)=>{
        await fetch(`http://localhost:5000/api/tasks/${id}`,{
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