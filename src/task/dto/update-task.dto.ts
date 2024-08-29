import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { TaskStatusEnum } from './status.enum';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @MinLength(2, { message: 'Name must have atleast 2 characters.' })
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  status: TaskStatusEnum;
}
