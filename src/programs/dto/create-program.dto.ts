import { ApiProperty } from '@nestjs/swagger';

export class CreateProgramDto {
  @ApiProperty({ example: 'Mars Exploration' })
  name: string;

  @ApiProperty({ example: 2026 })
  launchYear: number;
}
