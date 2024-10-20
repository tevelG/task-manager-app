import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from "@nestjs/common";
import { TaskService } from "./task.service";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "src/dto/create-task.dto";
import { UpdateTaskDto } from "src/dto/update-task.dto";

@Controller('tasks')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    findAll(@Query('status') status?: TaskStatus, @Query('search') search?: string): Promise<Task[]> {
        return this.taskService.findAll(status, search);
    }

    @Get(':id')
    findOne(@Param('id') id: string): Promise<Task> {
        return this.taskService.findOne(id);
    }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskService.create(createTaskDto);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
    update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto): Promise<Task> {
        return this.taskService.update(id, updateTaskDto);
    }
    
    @Delete(':id')
    delete(@Param('id') id: string): Promise<Task> {
        return this.taskService.delete(id);
    }
}