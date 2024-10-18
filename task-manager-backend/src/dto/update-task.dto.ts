import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task/task.model';

export class UpdateTaskDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsEnum(TaskStatus, {
        message: 'Status must be either "to do", "in progress", or "done"',
    })
    status?: TaskStatus;
}
