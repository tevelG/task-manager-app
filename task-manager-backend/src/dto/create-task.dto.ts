import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { TaskStatus } from "src/task/task.model";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(100)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(500)
    description?: string;

    @IsEnum(TaskStatus, {
        message: 'Status must be either "to do", "in progress", or "done"',
    })
    @IsOptional()
    status?: TaskStatus;
}