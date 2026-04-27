import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Probe } from '../../probes/entities/probe.entity';

@Entity({ name: 'programs' })
export class Program {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  launchYear: number;

  @OneToMany(() => Probe, (probe) => probe.program)
  probes: Probe[];
}
