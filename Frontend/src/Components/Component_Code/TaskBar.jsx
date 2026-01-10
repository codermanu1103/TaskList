import React from "react";

function TaskBar(props) {
    const [task,setTask]=React.useState("");
    const addTask=(e)=>{
        if(e.key==="Enter") {
            props.addTaskToList(task);
            console.log(task);
            setTask("");
        }
    }
    return (
        <div className="taskbar">
            <input 
                type="text" 
                name="task" 
                id="task" 
                placeholder="Create new task" 
                value={task} 
                onChange={(e)=>{setTask(e.target.value)}}
                onKeyDown={addTask}
            />
        </div>
    );
}

export default TaskBar;