import { Module } from '@nestjs/common';
import { RegisterUserController } from './registerUser.controller';
import { RegisterUserService } from './registerUser.service';

@Module({
  imports: [],
  controllers: [RegisterUserController],
  providers: [RegisterUserService],
})
export class RegisterModule {}
