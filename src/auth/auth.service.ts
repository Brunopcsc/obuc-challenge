import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EncryptionService } from 'src/common/encryption/encryption.service';
import { UsersRepository } from 'src/user/user.repository';
import { LoginResponseDTO } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UsersRepository,
    private jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async signIn(username: string, password: string): Promise<LoginResponseDTO> {
    const userOptional = await this.userRepository.findByUsername(username);

    if (userOptional.length === 0) {
      throw new BadRequestException('User not found!');
    }

    const user = userOptional.at(0);

    if (this.encryptionService.decrypt(user.password) !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, name: user.name };

    const loginResponse: LoginResponseDTO = new LoginResponseDTO();
    loginResponse.acessToken = await this.jwtService.signAsync(payload);

    return loginResponse;
  }
}
