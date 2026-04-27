import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProgramDto } from './dto/create-program.dto';
import { Program } from './entities/program.entity';

@Injectable()
export class ProgramsService {
  constructor(
    @InjectRepository(Program)
    private readonly programsRepository: Repository<Program>,
  ) {}

  async create(dto: CreateProgramDto): Promise<Program> {
    const program = this.programsRepository.create(dto);
    return this.programsRepository.save(program);
  }

  async findAll(): Promise<Program[]> {
    return this.programsRepository.find();
  }

  async findOne(id: string): Promise<Program> {
    const program = await this.programsRepository.findOne({ where: { id } });
    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }
    return program;
  }

  async findProbes(id: string): Promise<Program> {
    const program = await this.programsRepository.findOne({
      where: { id },
      relations: { probes: true },
    });
    if (!program) {
      throw new NotFoundException(`Program with id ${id} not found`);
    }
    return program;
  }
}
