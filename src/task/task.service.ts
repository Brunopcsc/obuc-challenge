import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { Task } from './entities/task.entity';
import { UserService } from 'src/user/user.service';
import { TaskStatusEnum } from './dto/status.enum';
import { User } from 'src/user/entities/user.entity';
import { GetTasksDTO } from './dto/get-tasks.dto';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly userService: UserService,
  ) {}

  async createTask(createTaskDto: CreateTaskDto) {
    const task: Task = new Task();
    task.description = createTaskDto.description;

    task.user = await this.findUserByIdExceptionable(createTaskDto.userId);

    this.taskRepository.save(task);
  }

  async updateTaskById(id: string, updateTaskDTO: UpdateTaskDto) {
    const task = await this.getTaskById(id);

    if (!task) {
      throw new BadRequestException('Task not found!');
    }

    if (task.status === TaskStatusEnum.DONE) {
      throw new BadRequestException('Completed tasks cannot be edited.');
    }

    task.user = await this.findUserByIdExceptionable(updateTaskDTO.userId);
    task.description = updateTaskDTO.description;
    task.status = updateTaskDTO.status;

    this.taskRepository.save(task);
  }

  async findUserByIdExceptionable(userId: string): Promise<User> {
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new BadRequestException('User not found!');
    }

    return user;
  }

  getTasks(getTasksDTO: GetTasksDTO): Promise<Task[]> {
    if (getTasksDTO.status) {
      return this.taskRepository.findByStatus(getTasksDTO.status);
    }

    return this.taskRepository.find({ relations: ['user'] });
  }

  async removeTask(id: string) {
    const task = await this.getTaskById(id);

    if (!task) {
      throw new BadRequestException('Task not found!');
    }

    this.taskRepository.remove(task);
  }

  getTaskById(id: string): Promise<Task> {
    return this.taskRepository.findOneBy({ id });
  }
}
