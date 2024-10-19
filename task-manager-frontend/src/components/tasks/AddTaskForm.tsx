import { useState } from 'react';
import Task, { TaskStatus } from './Task';

interface AddTaskFormProps {
    onAddTask: (title: string, description: string, status: TaskStatus) => void;
    onClose: () => void;
    initialTask?: Task; 
}

const AddTaskForm = ({ onAddTask, onClose, initialTask }: AddTaskFormProps) => {
    const [formState, setFormState] = useState({
        title: initialTask?.title || '',
        description: initialTask?.description || '',
        status: initialTask?.status || TaskStatus.ToDo,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddTask(formState.title, formState.description, formState.status as TaskStatus);
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="add-task-form">
            <div className="add-task-form__field">
                <label>Title</label>
                <input 
                    type="text" 
                    name="title"
                    value={formState.title} 
                    onChange={handleInputChange} 
                    required
                />
            </div>
            <div className="add-task-form__field">
                <label>Description</label>
                <input 
                    type="text" 
                    name="description"
                    value={formState.description} 
                    onChange={handleInputChange} 
                />
            </div>
            <div className="add-task-form__field">
                <label>Status</label>
                <select 
                    name="status"
                    value={formState.status} 
                    onChange={handleInputChange}
                >
                    {Object.values(TaskStatus).map(status => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">{initialTask ? 'Edit Task' : 'Add Task'}</button>
        </form>
    );
};

export default AddTaskForm;
