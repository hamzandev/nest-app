import { Injectable } from "@nestjs/common";
import { Task, TaskStatus } from "./tasks.model";
import { v4 as uuid } from "uuid";
import { CreateTaskDto } from "./dto/createTask.dto";
import { FilterTasksDto } from "./dto/filterTasks.dto";

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getTasks(): Task[] {
    return this.tasks;
  }

  filterTask(query: FilterTasksDto): Task[] {
    const { search, status } = query;
    if (status) {
      return this.tasks.filter((task) => task.status == status);
    }

    if (search) {
      return this.tasks.filter(
        (task) =>
          task.name.includes(search) || task.description.includes(search),
      );
    }
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id == id);
  }

  createTask(task: CreateTaskDto): Task {
    const { name, description } = task;
    const newTask: Task = {
      id: uuid(),
      name,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: string, status: TaskStatus): Task {
    const found = this.getTaskById(id);
    found.status = status;
    return found;
  }

  deleteTask(id: string): Task {
    const found = this.getTaskById(id);
    this.tasks.filter((task) => task.id !== id);
    return found;
  }
}
