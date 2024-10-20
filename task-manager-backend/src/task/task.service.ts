import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument, TaskStatus } from './task.model';
import { Model, Types } from 'mongoose';
import { CreateTaskDto } from 'src/dto/create-task.dto';
import { UpdateTaskDto } from 'src/dto/update-task.dto';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

    async findAll(status?: TaskStatus, search?: string): Promise<Task[]> {
        const query: any = {};

        if (status) {
            query.status = status;
        }

        if (search) {
            query.title = { $regex: search, $options: 'i'};
        }

        return this.taskModel.find(query).exec();
    }

    async findOne(id: string): Promise<Task> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid Task ID format');
        }

        const task = await this.taskModel.findById(id).exec();
        if (!task) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return task;
    }

    async create(createTaskDto: CreateTaskDto): Promise<Task> {
        if (!createTaskDto.title) {
            throw new BadRequestException('Title is required');
        }

        const newTask = new this.taskModel(createTaskDto);
        return newTask.save();
    }

    async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid Task ID format');
        }

        const updatedTask = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
        if (!updatedTask) {
            throw new NotFoundException(`Task with id ${id} not found`);
        }
        return updatedTask
    }

    async delete(id: string): Promise<Task> {
        return this.taskModel.findByIdAndDelete(id).exec();
    }
}
