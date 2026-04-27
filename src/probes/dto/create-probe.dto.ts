import { ApiProperty } from '@nestjs/swagger';
import { ProbeType } from '../entities/probe.entity';

export class CreateProbeDto {
  @ApiProperty({ example: 'Perseverance' })
  name: string;

  @ApiProperty({ enum: ProbeType, example: ProbeType.Rover })
  type: ProbeType;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  programId: string;
}
