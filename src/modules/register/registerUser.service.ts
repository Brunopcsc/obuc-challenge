import { Injectable } from '@nestjs/common';

@Injectable()
export class RegisterUserService {
  registerUser(): string {
    return 'Hello World!';
  }
}
