import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/createTask.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      name: 'Learning Laravel',
      description: '',
      status: TaskStatus.OPEN,
    },
    {
      id: 2,
      name: 'Learning NestJS',
      description: '',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(task: CreateTaskDto): Task {
    const { name, description } = task
    const newTask: Task = {
      id: uuid(),
      name,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(newTask)

    return newTask
  }
}
