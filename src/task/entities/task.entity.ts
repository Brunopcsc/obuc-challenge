import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from '../dto/status.enum';
import { User } from 'src/user/entities/user.entity';

@Entity('task')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  description: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;

  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.NOT_STARTED,
  })
  status: TaskStatusEnum;
}
