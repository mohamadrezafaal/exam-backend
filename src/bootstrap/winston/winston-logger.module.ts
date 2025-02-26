import { Module } from '@nestjs/common';
import { utilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

@Module({
  imports: [
    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            utilities.format.nestLike(),
          ),
          level: 'info',
        }),
        new DailyRotateFile({
          filename: `log-%DATE%.log`,
          dirname: './logs/',
          datePattern: 'YYYY-MM-DD',
        }),
      ],
    }),
  ],
})
export class WinstonLoggerModule {}
