import React from "react";
function Task(props) {
    const {_id,task}=props.task;
    const [flag,setflag] = React.useState(0);
    const [newTask, setNewTask] =React.useState(task);
    const editTask=(e)=>{
        if(e.key==="Enter")
        {
            props.editTask(_id,e.target.value);
            setflag(0);
        }
    }
    return (
        <div>
            <button onClick={()=>{setflag(1)}}>Edit</button>
            {
                flag?<input onKeyDown={editTask} onChange={(e)=>{setNewTask(e.target.value)}} type="text" name="editedTask" id="editedTask" value={newTask}/>:<span>{task}</span>           
            }
            <button onClick={()=>{props.deleteTask(_id)}}>Done</button>
            
        </div>
    );
}

export default Task;


// when using local file to strore the tasks, use id instead of _id