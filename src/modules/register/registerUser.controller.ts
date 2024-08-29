import { Controller, Post } from '@nestjs/common';
import { RegisterUserService } from './registerUser.service';

@Controller('register')
export class RegisterUserController {
  constructor(private readonly registerUserService: RegisterUserService) {}

  @Post()
  registerUser(): string {
    return this.registerUserService.registerUser();
  }
}
