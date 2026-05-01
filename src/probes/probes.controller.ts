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
import { CreateProbeDto } from './dto/create-probe.dto';
import { Probe } from './entities/probe.entity';
import { ProbesService } from './probes.service';

@ApiTags('probes')
@ApiBearerAuth('JWT-auth')
@Controller('probes')
export class ProbesController {
  constructor(private readonly probesService: ProbesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a probe' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Probe })
  create(@Body() dto: CreateProbeDto) {
    return this.probesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all probes' })
  @ApiResponse({ status: HttpStatus.OK, type: [Probe] })
  findAll() {
    return this.probesService.findAll();
  }

  @Get('reports/mission-count')
  @ApiOperation({ summary: 'Mission count per probe' })
  @ApiResponse({ status: HttpStatus.OK })
  missionCountPerProbe() {
    return this.probesService.missionCountPerProbe();
  }

  @Get('reports/mars-missions')
  @ApiOperation({ summary: 'Probes with Mars missions' })
  @ApiResponse({ status: HttpStatus.OK })
  probesWithMarsMissions() {
    return this.probesService.probesWithMarsMissions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one probe by id' })
  @ApiResponse({ status: HttpStatus.OK, type: Probe })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.probesService.findOne(id);
  }

  @Get(':id/missions')
  @ApiOperation({ summary: 'Get a probe with missions' })
  @ApiResponse({ status: HttpStatus.OK, type: Probe })
  findMissions(@Param('id', ParseUUIDPipe) id: string) {
    return this.probesService.findMissions(id);
  }
}
