import React from "react";
function Task(props) {
    const {id,task}=props.task;
    const [flag,setflag] = React.useState(0);
    const [newTask, setNewTask] =React.useState(task);
    const editTask=(e)=>{
        if(e.key==="Enter")
        {
            props.editTask(id,e.target.value);
            setflag(0);
        }
    }
    return (
        <div>
            <button onClick={()=>{setflag(1)}}>Edit</button>
            {
                flag?<input onKeyDown={editTask} onChange={(e)=>{setNewTask(e.target.value)}} type="text" name="editedTask" id="editedTask" value={newTask}/>:<span>{task}</span>           
            }
            <button onClick={()=>{props.deleteTask(id)}}>Done</button>
            
        </div>
    );
}

export default Task;