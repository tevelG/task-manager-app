import classNames from "classnames";
import { IoTrashOutline } from "react-icons/io5";
import { PiPencilLine } from "react-icons/pi";

interface Task {
    _id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

interface TaskProps extends Task {
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

export enum TaskStatus {
    ToDo = 'to do',
    InProgress = 'in progress',
    Done = 'done'
}

export const getStatusColor = (status: TaskStatus) => {
    const statusColor = status === TaskStatus.Done 
    ? 'green'
    : (
        status === TaskStatus.InProgress 
        ? 'orange'
        : 'red'
    )
    return statusColor;
}

const Task = ({ _id, title, description, status, onDelete, onEdit }: TaskProps) => {
    const statusColor = getStatusColor(status);

    return (
        <li className={classNames("task", `task-${statusColor}`)}>
            <div className="task__container">
                <div className="task__container__text" >
                    <div className="task__container__text__header">
                        <h2 className="task__container__text__header--title">{title}</h2>
                        <span className={classNames('task__container__text__header--status', `task__container__text__header--status-${statusColor}`)}>{status}</span>
                    </div>
                    <h3 className="task__container__text--description">{description}</h3>
                </div>
                <div className="task__container__icons">
                    <PiPencilLine onClick={() => onEdit({ _id, title, description, status})} />
                    <IoTrashOutline onClick={() => onDelete(_id)} />
                </div>  
            </div>
        </li>
    )
}

export default Task;