import {ExecutionContext, Injectable, UnauthorizedException} from '@nestjs/common'
import {PassportStrategy} from '@nestjs/passport'
import {ExtractJwt, Strategy, VerifiedCallback} from 'passport-jwt'
import { AuthService } from '../auth.service';
import * as fs from 'fs';



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(private authService: AuthService) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: fs.readFileSync(process.env.PUBLIC_KEY).toString(),
          algorithms: ['RS256'],
          passReqToCallback: true,
        });
      }
    
      async validate(req: Request, payload: any, done: VerifiedCallback) {

        const headers = {
          'Content-Type': 'application/json',
          authorization: `${req.headers['authorization']}`
        }
        const result  = await this.authService.checkToken(payload.id, payload.jti, payload.clientId, process.env.SYSTEM_ID.toString(), headers);
        if(result) {
          done(null, payload);
        }else {
          done(new UnauthorizedException(), false);
        }
      }
}