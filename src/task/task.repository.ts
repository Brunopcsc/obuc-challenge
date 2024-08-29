import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { TaskStatusEnum } from './dto/status.enum';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async findByStatus(status: TaskStatusEnum): Promise<Task[]> {
    return this.find({ where: { status } });
  }
}
