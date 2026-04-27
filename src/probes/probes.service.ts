import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../programs/entities/program.entity';
import { CreateProbeDto } from './dto/create-probe.dto';
import { Probe } from './entities/probe.entity';

@Injectable()
export class ProbesService {
  constructor(
    @InjectRepository(Probe)
    private readonly probesRepository: Repository<Probe>,
    @InjectRepository(Program)
    private readonly programsRepository: Repository<Program>,
  ) {}

  async create(dto: CreateProbeDto): Promise<Probe> {
    const program = await this.programsRepository.findOne({
      where: { id: dto.programId },
    });
    if (!program) {
      throw new NotFoundException(`Program with id ${dto.programId} not found`);
    }

    const probe = this.probesRepository.create({
      name: dto.name,
      type: dto.type,
      program,
    });
    return this.probesRepository.save(probe);
  }

  async findAll(): Promise<Probe[]> {
    return this.probesRepository.find({ relations: { program: true } });
  }

  async findOne(id: number): Promise<Probe> {
    const probe = await this.probesRepository.findOne({
      where: { id },
      relations: { program: true },
    });
    if (!probe) {
      throw new NotFoundException(`Probe with id ${id} not found`);
    }
    return probe;
  }

  async findMissions(id: number): Promise<Probe> {
    const probe = await this.probesRepository.findOne({
      where: { id },
      relations: { missions: true, program: true },
    });
    if (!probe) {
      throw new NotFoundException(`Probe with id ${id} not found`);
    }
    return probe;
  }
}
