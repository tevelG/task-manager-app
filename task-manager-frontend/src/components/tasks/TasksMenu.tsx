import classNames from "classnames";
import { getStatusColor, TaskStatus } from "./Task";
import { useCallback, useMemo, useState } from "react";
import Modal from "../generic/Modal";
import AddTaskForm from "./AddTaskForm";
import { BsPlusCircle } from "react-icons/bs";

interface TasksMenuProps {
    handleFilterChange: (status: TaskStatus | null) => void;
    onAddTask: (title: string, description: string, status: TaskStatus) => void;
}

type FilterStatusType = TaskStatus | 'all';

const TasksMenu = ({ handleFilterChange, onAddTask }: TasksMenuProps) => {
    const [selectedStatus, setSelectedStatus] = useState<FilterStatusType>('all')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const filterStatuses: FilterStatusType[] = useMemo(() => ['all', ...Object.values(TaskStatus)], []);

    console.log('aaa')

    const handleClick = useCallback((status: FilterStatusType) => {
        handleFilterChange(status === 'all' ? null : status); 
        setSelectedStatus(status);
    }, [handleFilterChange])

    return (
        <div className="tasks-menu">
            <div className="tasks-menu__filters">
                <p className="tasks-menu__filters--text">Filter by status:</p>
                <div className="tasks-menu__filters__list">
                    {filterStatuses.map((status) => {
                        const statusColor = status !== 'all' ? getStatusColor(status): undefined;
                        console.log(status, selectedStatus)

                        return (
                            <button 
                                key={status}
                                className={classNames(
                                    "tasks-menu__filters__list--button", 
                                    `tasks-menu__filters__list--button-${statusColor}`,
                                    // {"tasks-menu__filters__list--button-selected": status === selectedStatus}
                                )}
                                onClick={() => handleClick(status)} 
                            >
                                {status}
                            </button>
                        )
                    })}
                </div>
            </div>
            <button 
                className="tasks-menu__filters--button-add"
                onClick={() => setIsModalOpen(true) }
            >
                <BsPlusCircle />
                <p>Add Task</p>
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddTaskForm onAddTask={onAddTask} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    )
}

export default TasksMenu;