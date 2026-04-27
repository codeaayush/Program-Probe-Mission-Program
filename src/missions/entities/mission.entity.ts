import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Probe } from '../../probes/entities/probe.entity';

@Entity({ name: 'missions' })
export class Mission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  destination: string;

  @Column()
  success: boolean;

  @ManyToOne(() => Probe, (probe) => probe.missions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  probe: Probe;
}
