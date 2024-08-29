import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Public } from 'src/auth/public-strategy';
import { UserResponseDTO } from './dto/user-response.dto';
import { mapUsersToResponse } from './dto/user-mapper';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({
    status: 200,
    description: 'User successfully registered',
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    await this.userService.createUser(createUserDto);
  }

  @Get('users')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User' })
  @ApiResponse({
    status: 200,
    description: 'Users returned successfully',
    type: [Promise<UserResponseDTO[]>],
  })
  async findAll(): Promise<UserResponseDTO[]> {
    const users = await this.userService.findAllUsers();

    return mapUsersToResponse(users);
  }

  @Get('users/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'User' })
  @ApiResponse({
    status: 200,
    description: 'User returned successfully',
    type: [Promise<User>],
  })
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }
}
