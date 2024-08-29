import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksDTO } from './dto/get-tasks.dto';
import { mapTasksToResponse } from './dto/task-mapper';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  updateTaskById(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTaskById(id, updateTaskDto);
  }

  @Get()
  async getTasks(@Body() getTasksDTO: GetTasksDTO) {
    const tasks = await this.taskService.getTasks(getTasksDTO);

    return mapTasksToResponse(tasks);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.removeTask(id);
  }
}
