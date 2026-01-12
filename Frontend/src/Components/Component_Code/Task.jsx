import React from "react";
import "../Component_CSS/Task.css";

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
            <div className="outercontainer">
                <div className="taskcontainer">
                    {
                        flag?<input className="task" id="edittask" onKeyDown={editTask} onChange={(e)=>{setNewTask(e.target.value)}} type="text" name="editedTask" value={newTask}/>:<span className="task" id="tasks">{task}</span>           
                    }
                </div>
                <div className="buttons">
                    <button className="button" id="edit" onClick={()=>{setflag(1)}}>Edit</button>
                    <button className="button" id="Done" onClick={()=>{props.deleteTask(_id)}}>Done</button>
                </div>
            </div>
            
        </div>
    );
}

export default Task;


// when using local file to strore the tasks, use id instead of _id