import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('token')
  @HttpCode(HttpStatus.OK)
  async token(
    @Body() body: { username?: string; password?: string },
  ) {
    return this.authService.issueAccessToken(
      body.username ?? '',
      body.password ?? '',
    );
  }
}
