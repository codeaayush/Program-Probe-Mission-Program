import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mission } from '../../missions/entities/mission.entity';
import { Program } from '../../programs/entities/program.entity';

export enum ProbeType {
  Orbiter = 'orbiter',
  Lander = 'lander',
  Rover = 'rover',
  Satellite = 'satellite',
}

@Entity({ name: 'probes' })
export class Probe {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'text',
  })
  type: ProbeType;

  @ManyToOne(() => Program, (program) => program.probes, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  program: Program;

  @OneToMany(() => Mission, (mission) => mission.probe)
  missions: Mission[];
}
