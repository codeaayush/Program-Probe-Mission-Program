import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { currentYear } from '../../common/validators/current-year';

export class CreateProgramDto {
  @ApiProperty({ example: 'Mars Exploration', minLength: 3 })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @ApiProperty({ example: 2026, minimum: 1950, maximum: currentYear() })
  @Type(() => Number)
  @IsInt()
  @Min(1950)
  @Max(currentYear())
  launchYear: number;
}
