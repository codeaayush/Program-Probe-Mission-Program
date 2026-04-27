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
import { CreateProgramDto } from './dto/create-program.dto';
import { Program } from './entities/program.entity';
import { ProgramsService } from './programs.service';

@ApiTags('programs')
@ApiBearerAuth('JWT-auth')
@Controller('programs')
export class ProgramsController {
  constructor(private readonly programsService: ProgramsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a program' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Program })
  create(@Body() dto: CreateProgramDto) {
    return this.programsService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all programs' })
  @ApiResponse({ status: HttpStatus.OK, type: [Program] })
  findAll() {
    return this.programsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one program by id' })
  @ApiResponse({ status: HttpStatus.OK, type: Program })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.programsService.findOne(id);
  }

  @Get(':id/probes')
  @ApiOperation({ summary: 'Get a program with probes' })
  @ApiResponse({ status: HttpStatus.OK, type: Program })
  findProbes(@Param('id', ParseUUIDPipe) id: string) {
    return this.programsService.findProbes(id);
  }
}
