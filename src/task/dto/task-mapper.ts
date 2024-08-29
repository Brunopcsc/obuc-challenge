import { mapUsersToResponse } from 'src/user/dto/user-mapper';
import { Task } from '../entities/task.entity';
import { TaskResponseDTO } from './task-response.dto';

export function mapTasksToResponse(tasks: Task[]): TaskResponseDTO[] {
  return tasks.map((task) => {
    const taskResponseDTO: TaskResponseDTO = new TaskResponseDTO();

    taskResponseDTO.id = task.id;
    taskResponseDTO.description = task.description;
    taskResponseDTO.status = task.status;
    taskResponseDTO.user = mapUsersToResponse([task.user]).at(0);

    return taskResponseDTO;
  });
}
