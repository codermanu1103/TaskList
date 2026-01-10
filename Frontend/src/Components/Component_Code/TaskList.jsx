import Task from "./Task"

function TaskList(props) {
    return (
        <>
            {
                props.taskInList.map(task=>(
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