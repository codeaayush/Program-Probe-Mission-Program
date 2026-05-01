import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsProbeIdExistsConstraint } from '../../common/validators/is-probe-id-exists.constraint';

export class CreateMissionDto {
  @ApiProperty({ example: 'Mars' })
  @IsString()
  @IsNotEmpty()
  destination: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  success: boolean;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  @IsUUID()
  @Validate(IsProbeIdExistsConstraint)
  probeId: string;
}
