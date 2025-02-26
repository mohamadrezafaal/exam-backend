import { BasicStrategy as Strategy } from 'passport-http';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy, 'basic') {
  constructor(private readonly configService: ConfigService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(
    req: any,
    username: string,
    password: string,
  ): Promise<boolean> {
    if (
      this.configService.get('basic.username') === username &&
      this.configService.get('basic.password') === password
    ) {
      return true;
    }
    throw new UnauthorizedException();
  }
}
