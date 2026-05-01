import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mission } from '../missions/entities/mission.entity';
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

  async successfulMissionsByProgram(): Promise<
    Array<{
      programId: string;
      programName: string;
      probeId: string;
      probeName: string;
      missionId: string;
      destination: string;
      success: boolean;
    }>
  > {
    const rows = await this.programsRepository
      .createQueryBuilder('program')
      .innerJoin('program.probes', 'probe')
      .innerJoin(Mission, 'mission', 'mission.probeId = probe.id')
      .where('mission.success = :success', { success: true })
      .select([
        'program.id AS programId',
        'program.name AS programName',
        'probe.id AS probeId',
        'probe.name AS probeName',
        'mission.id AS missionId',
        'mission.destination AS destination',
        'mission.success AS success',
      ])
      .orderBy('program.name', 'ASC')
      .addOrderBy('probe.name', 'ASC')
      .addOrderBy('mission.destination', 'ASC')
      .getRawMany<{
        programId: string;
        programName: string;
        probeId: string;
        probeName: string;
        missionId: string;
        destination: string;
        success: boolean;
      }>();

    return rows.map((row) => ({
      ...row,
      success: Boolean(row.success),
    }));
  }

  async programsWithFailedMissions(): Promise<
    Array<{
      programId: string;
      programName: string;
    }>
  > {
    return this.programsRepository
      .createQueryBuilder('program')
      .innerJoin('program.probes', 'probe')
      .innerJoin(Mission, 'mission', 'mission.probeId = probe.id')
      .where('mission.success = :success', { success: false })
      .select(['program.id AS programId', 'program.name AS programName'])
      .distinct(true)
      .orderBy('program.name', 'ASC')
      .getRawMany<{
        programId: string;
        programName: string;
      }>();
  }
}
