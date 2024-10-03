import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => this.getTokenFromHeaders(request),
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_KEY'),
    });
  }

  getTokenFromHeaders(request: Request) {
    const authorization = request?.headers.authorization;
    if (!authorization) return;
    const [bearer, token] = authorization.split(' ');
    if (bearer != 'Bearer' || !token) return null;
    return token;
  }

  async validate(payload: any) {
    const { user } = payload;
    return user;
  }
}
