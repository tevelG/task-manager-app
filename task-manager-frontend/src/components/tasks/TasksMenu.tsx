import classNames from "classnames";
import { getStatusColor, TaskStatus } from "./Task";
import { useCallback, useMemo, useState } from "react";
import Modal from "../generic/Modal";
import AddTaskForm from "./AddTaskForm";
import { BsPlusCircle } from "react-icons/bs";
import TasksMenuFilters from "./TasksMenuFilters";
import SearchBar from "../generic/SearchBar";

interface TasksMenuProps {
    handleFilterChange: (status: TaskStatus | null) => void;
    handleSearchChange: (searchTerm: string) => void;
    onAddTask: (title: string, description: string, status: TaskStatus) => void;
}

const TasksMenu = ({ handleFilterChange, handleSearchChange, onAddTask }: TasksMenuProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);
        handleSearchChange(searchValue);
    };

    return (
        <div className="tasks-menu">
            <TasksMenuFilters handleFilterChange={handleFilterChange} />
            
            <SearchBar 
                placeHolder="Search by title"
                value={searchTerm}
                onChange={handleSearchInputChange} 
            />
            
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