import { Module } from '@nestjs/common';
import { BaseInfoService } from './base-info.service';
import { BaseInfoController } from './base-info.controller';
import { BaseInfoProfile } from './base-info.profile';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseInfo } from '@/entities/base-info.entity';
import { BaseInfoRepository } from './base-info.repository';


@Module({
  imports: [TypeOrmModule.forFeature([BaseInfo])],
  controllers: [BaseInfoController],
  providers: [BaseInfoService, BaseInfoProfile, BaseInfoRepository],
  exports: [BaseInfoService, BaseInfoRepository],
})
export class BaseInfoModule {}
