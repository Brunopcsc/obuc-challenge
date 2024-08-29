import { UserResponseDTO } from 'src/user/dto/user-response.dto';
import { TaskStatusEnum } from './status.enum';

export class TaskResponseDTO {
  id: string;
  description: string;
  status: TaskStatusEnum;
  user: UserResponseDTO;
}
