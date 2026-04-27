import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('app')
@ApiBearerAuth('JWT-auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Hello (requires JWT)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Greeting string',
    schema: { type: 'string', example: 'Hello World!' },
  })
  @ApiUnauthorizedResponse({
    description: 'Missing or invalid Bearer token',
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
