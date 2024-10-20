import { useEffect, useState } from "react";
import TasksList from "../tasks/TasksList";
import TasksMenu from "../tasks/TasksMenu";
import Header from "./Header";
import Task, { TaskStatus } from "../tasks/Task";
import apiClient from "../../api/axios";
import Modal from "../generic/Modal";
import AddTaskForm from "../tasks/AddTaskForm";

const Layout = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState({
        status: null as TaskStatus | null,
        searchTerm: ""
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

    const fetchTasks = async (status?: TaskStatus, search?: string) => {
        try {
            let url = 'tasks';
            const params = new URLSearchParams();

            if (status) {
                params.append('status', status);
            }

            if (search) {
                params.append('search', search);
            }

            const response = await apiClient.get(`${url}?${params.toString()}`);
            setTasks(response.data);
        } catch (error) {
            console.log('Error fetching tasks', error);
        }
    };

    const handleAddTask = async (title: string, description: string, status: TaskStatus) => {
        try {
            const response = await apiClient.post('tasks', { title, description, status });
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.log('Error adding task', error);
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        try {
            await apiClient.delete(`tasks/${taskId}`);
            setTasks(tasks.filter(task => task._id !== taskId));
        } catch (error) {
            console.log('Error deleting task', error);
        }
    };

    const handleEditTask = (task: Task) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };
    
    const handleAddOrUpdateTask = async (title: string, description: string, status: TaskStatus) => {
        if (taskToEdit) {
            // Update existing task
            try {
                const response = await apiClient.put(`tasks/${taskToEdit._id}`, { title, description, status });
                setTasks(tasks.map(task => task._id === taskToEdit._id ? response.data : task));
            } catch (error) {
                console.log('Error updating task', error);
            }
        } else {
            // Add new task
            try {
                const response = await apiClient.post('tasks', { title, description, status });
                setTasks([...tasks, response.data]);
            } catch (error) {
                console.log('Error adding task', error);
            }
        }
        setIsModalOpen(false);
        setTaskToEdit(undefined);
    };

    const handleFilterChange = (status: TaskStatus | null) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            status
        }));
    };

    const handleSearchChange = (searchTerm: string) => {
        setFilter(prevFilter => ({
            ...prevFilter,
            searchTerm
        }));
    };

    useEffect(() => {
        fetchTasks(filter.status || undefined, filter.searchTerm);
    }, [filter]);
    
    return (
        <div className="layout">
            <Header />
            <TasksMenu 
                handleFilterChange={handleFilterChange} 
                handleSearchChange={handleSearchChange} 
                onAddTask={handleAddTask}
            />
            <TasksList 
                tasks={tasks}
                onDeleteTask={handleDeleteTask} 
                onEditTask={handleEditTask} 
            />
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <AddTaskForm 
                    onAddTask={handleAddOrUpdateTask} 
                    onClose={() => setIsModalOpen(false)} 
                    initialTask={taskToEdit}
                />
            </Modal>
        </div>
    )
}

export default Layout;