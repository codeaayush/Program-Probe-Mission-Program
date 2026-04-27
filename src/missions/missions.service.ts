import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Probe } from '../probes/entities/probe.entity';
import { CreateMissionDto } from './dto/create-mission.dto';
import { Mission } from './entities/mission.entity';

@Injectable()
export class MissionsService {
  constructor(
    @InjectRepository(Mission)
    private readonly missionsRepository: Repository<Mission>,
    @InjectRepository(Probe)
    private readonly probesRepository: Repository<Probe>,
  ) {}

  async create(dto: CreateMissionDto): Promise<Mission> {
    const probe = await this.probesRepository.findOne({
      where: { id: dto.probeId },
    });
    if (!probe) {
      throw new NotFoundException(`Probe with id ${dto.probeId} not found`);
    }

    const mission = this.missionsRepository.create({
      destination: dto.destination,
      success: dto.success,
      probe,
    });
    return this.missionsRepository.save(mission);
  }

  async findAll(): Promise<Mission[]> {
    return this.missionsRepository.find({ relations: { probe: true } });
  }

  async findOne(id: number): Promise<Mission> {
    const mission = await this.missionsRepository.findOne({
      where: { id },
      relations: { probe: true },
    });
    if (!mission) {
      throw new NotFoundException(`Mission with id ${id} not found`);
    }
    return mission;
  }
}
