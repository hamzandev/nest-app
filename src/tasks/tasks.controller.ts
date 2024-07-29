import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task, TaskStatus } from "./tasks.model";
import { CreateTaskDto } from "./dto/createTask.dto";
import { FilterTasksDto } from "./dto/filterTasks.dto";

@Controller("/api/tasks")
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() query: FilterTasksDto): Task[] {
    if (Object.keys(query).length > 0) {
      return this.tasksService.filterTask(query);
    }
    return this.tasksService.getTasks();
  }

  @Get("/:id")
  gettaskById(@Param("id") id: string, @Query("query") query?: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() creteTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(creteTaskDto);
  }

  @Patch("/:id/status")
  updateTask(
    @Param("id") id: string,
    @Body("status") status: TaskStatus,
  ): Task {
    return this.tasksService.updateTask(id, status);
  }

  @Delete("/:id")
  deleteTask(@Param("id") id: string): Task {
    return this.tasksService.deleteTask(id);
  }
}
