import { ApiProperty } from '@nestjs/swagger';
import { ProbeType } from '../entities/probe.entity';

export class CreateProbeDto {
  @ApiProperty({ example: 'Perseverance' })
  name: string;

  @ApiProperty({ enum: ProbeType, example: ProbeType.Rover })
  type: ProbeType;

  @ApiProperty({ example: 1 })
  programId: number;
}
