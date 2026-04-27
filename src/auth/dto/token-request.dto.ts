import { ApiProperty } from '@nestjs/swagger';

export class TokenRequestDto {
  @ApiProperty({ example: 'admin', description: 'Username' })
  username: string;

  @ApiProperty({ example: 'admin', description: 'Password' })
  password: string;
}
