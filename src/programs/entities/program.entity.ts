import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Probe } from '../../probes/entities/probe.entity';

@Entity({ name: 'programs' })
export class Program {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  launchYear: number;

  @OneToMany(() => Probe, (probe) => probe.program)
  probes: Probe[];
}