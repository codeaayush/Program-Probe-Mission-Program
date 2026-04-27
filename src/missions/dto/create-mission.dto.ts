import { ApiProperty } from '@nestjs/swagger';

export class CreateMissionDto {
  @ApiProperty({ example: 'Mars' })
  destination: string;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({
    format: 'uuid',
    example: '550e8400-e29b-41d4-a716-446655440002',
  })
  probeId: string;
}
