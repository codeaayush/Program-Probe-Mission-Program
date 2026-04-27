import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { TokenRequestDto } from './dto/token-request.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { Public } from './public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('token')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Issue JWT (demo credentials: admin / admin)' })
  @ApiBody({ type: TokenRequestDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Access token issued',
    type: TokenResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid username or password' })
  async token(@Body() body: TokenRequestDto) {
    return this.authService.issueAccessToken(
      body.username ?? '',
      body.password ?? '',
    );
  }
}
