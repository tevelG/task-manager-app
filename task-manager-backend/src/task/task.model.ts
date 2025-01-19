import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum TaskStatus {
  TODO = 'to do',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export type TaskDocument = Task & Document;

@Schema()
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ enum: Object.values(TaskStatus), default: TaskStatus.TODO })
  status: TaskStatus;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);