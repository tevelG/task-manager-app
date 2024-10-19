import Task from "./Task";

interface TaskListProps {
    tasks: Task[];
    onDeleteTask: (taskId: string) => void;
    onEditTask: (task: Task) => void;
}

const TasksList = ({ tasks, onDeleteTask, onEditTask }: TaskListProps) => {
    return (
        <ul className="tasks-list">
            {tasks.map(task => 
                <Task 
                    key={`task ${task._id}`}
                    // _id={task._id}
                    // title={task.title} 
                    // description={task.description} 
                    // status={task.status}
                    {...task}
                    onDelete={onDeleteTask}
                    onEdit={onEditTask}
                />
            )}
        </ul>
    )
}

export default TasksList;