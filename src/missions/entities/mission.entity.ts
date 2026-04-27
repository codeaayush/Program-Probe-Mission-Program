import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Probe } from '../../probes/entities/probe.entity';

@Entity({ name: 'missions' })
export class Mission {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
