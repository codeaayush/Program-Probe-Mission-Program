import { ApiProperty } from '@nestjs/swagger';

export class CreateMissionDto {
  @ApiProperty({ example: 'Mars' })
  destination: string;

  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 1 })
  probeId: number;
}
