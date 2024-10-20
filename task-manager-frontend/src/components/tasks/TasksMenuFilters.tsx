import { useState } from "react";
import { getStatusColor, TaskStatus } from "./Task";
import classNames from "classnames";

interface TasksMenuFiltersProps {
    handleFilterChange: (status: TaskStatus | null) => void;
}

type FilterStatusType = TaskStatus | 'all';

const TasksMenuFilters = ({ handleFilterChange }: TasksMenuFiltersProps) => {
    const [selectedStatus, setSelectedStatus] = useState<FilterStatusType>('all');

    const filterStatuses: FilterStatusType[] = ['all', ...Object.values(TaskStatus)];

    const handleClick = (status: FilterStatusType) => {
        handleFilterChange(status === 'all' ? null : status); 
        // setSelectedStatus(status);
    };

    console.log('here')

    return (
        <div className="tasks-menu__filters">
            <p className="tasks-menu__filters--text">Filter by status:</p>
            <div className="tasks-menu__filters__list">
                {filterStatuses.map((status) => {
                    const statusColor = status !== 'all' ? getStatusColor(status): undefined;
                    // console.log(status, selectedStatus)

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
    )
}

export default TasksMenuFilters;