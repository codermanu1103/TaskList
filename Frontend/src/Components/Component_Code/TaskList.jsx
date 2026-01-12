import Task from "./Task"

function TaskList(props) {
    return (
        <>
            {
                props.taskInList.slice().reverse().map(task=>(
                <Task 
                    task={task} 
                    deleteTask={props.deleteTask}
                    editTask={props.editTask}
                />
            ))}
        </>
    );
}

export default TaskList;