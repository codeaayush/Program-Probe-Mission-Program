import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateMissionDto } from './dto/create-mission.dto';
import { Mission } from './entities/mission.entity';
import { MissionsService } from './missions.service';

@ApiTags('missions')
@ApiBearerAuth('JWT-auth')
@Controller('missions')
export class MissionsController {
  constructor(private readonly missionsService: MissionsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a mission' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Mission })
  create(@Body() dto: CreateMissionDto) {
    return this.missionsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all missions' })
  @ApiResponse({ status: HttpStatus.OK, type: [Mission] })
  findAll() {
    return this.missionsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one mission by id' })
  @ApiResponse({ status: HttpStatus.OK, type: Mission })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.missionsService.findOne(id);
  }
}
