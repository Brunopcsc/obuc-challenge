import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './user.repository';
import { EncryptionService } from 'src/common/encryption/encryption.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly encryptionService: EncryptionService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const searchUser: User[] = await this.userRepository.findByUsername(
      createUserDto.username,
    );

    if (searchUser.length > 0)
      throw new BadRequestException('User already registered.');

    const user: User = new User();
    user.name = createUserDto.name;
    user.username = createUserDto.username;
    user.password = this.encryptionService.encrypt(createUserDto.password);

    this.userRepository.save(user);
  }

  findAllUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  findById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
