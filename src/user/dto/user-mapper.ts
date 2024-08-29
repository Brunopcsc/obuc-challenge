import { User } from '../entities/user.entity';
import { UserResponseDTO } from './user-response.dto';

export function mapUsersToResponse(users: User[]): UserResponseDTO[] {
  return users.map((user) => {
    const userResponse: UserResponseDTO = new UserResponseDTO();

    userResponse.id = user.id;
    userResponse.name = user.name;
    userResponse.username = user.username;

    return userResponse;
  });
}
