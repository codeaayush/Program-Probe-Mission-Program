import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  @ApiProperty({ description: 'JWT access token' })
  accessToken: string;

  @ApiProperty({ example: 'Bearer', enum: ['Bearer'] })
  tokenType: 'Bearer';

  @ApiProperty({ example: 3600, description: 'Lifetime in seconds' })
  expiresIn: number;

  @ApiProperty({
    example: '2026-04-26T14:00:00.000Z',
    description: 'Absolute expiry (ISO 8601)',
  })
  expiresAt: string;
}
