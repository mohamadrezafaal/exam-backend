import { Controller, Get, Res, UseFilters, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from './auth/guards/jwt-guard.guard';
import { AuthExceptionFilter } from './common/filters/exceptions/auth-exception-filter';

@Controller()
@UseGuards(JwtAuthGuard)
@UseFilters(AuthExceptionFilter)
export class AppController {
  @Get('')
  log(@Res() res: Response) {
    console.log('Hi There');
    res.json({
      content: "Hi, I'm authenticated form OAuth",
    });
  }
}
