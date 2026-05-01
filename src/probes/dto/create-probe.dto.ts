import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsProgramIdExistsConstraint } from '../../common/validators/is-program-id-exists.constraint';
import { ProbeType } from '../entities/probe.entity';

export class CreateProbeDto {
  @ApiProperty({ example: 'Perseverance' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ enum: ProbeType, example: ProbeType.Rover })
  @IsEnum(ProbeType)
  type: ProbeType;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440001',
  })
  @IsUUID()
  @Validate(IsProgramIdExistsConstraint)
  programId: string;
}
