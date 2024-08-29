import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/login.dto';
import { Public } from './public-strategy';
import { LoginResponseDTO } from './dto/login-response.dto';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged in',
    type: [LoginResponseDTO],
  })
  signIn(@Body() loginDTO: LoginDTO) {
    return this.authService.signIn(loginDTO.username, loginDTO.password);
  }
}
