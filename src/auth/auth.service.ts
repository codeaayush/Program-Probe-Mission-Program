import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  HARDCODED_PASSWORD,
  HARDCODED_USERNAME,
  JWT_EXPIRES_IN_SECONDS,
} from './constants';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async issueAccessToken(username: string, password: string) {
    if (username !== HARDCODED_USERNAME || password !== HARDCODED_PASSWORD) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: 'admin', username: HARDCODED_USERNAME };
    const accessToken = await this.jwtService.signAsync(payload);
    const expiresAt = new Date(
      Date.now() + JWT_EXPIRES_IN_SECONDS * 1000,
    ).toISOString();

    return {
      accessToken,
      tokenType: 'Bearer' as const,
      expiresIn: JWT_EXPIRES_IN_SECONDS,
      expiresAt,
    };
  }
}
