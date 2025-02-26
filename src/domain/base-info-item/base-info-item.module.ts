import {Module} from '@nestjs/common';
import {BaseInfoItemService} from './base-info-item.service';
import {BaseInfoItemProfile} from './base-info-item.profile';
import {TypeOrmModule} from '@nestjs/typeorm';
import {BaseInfoItem} from '@/entities/base-info-item.entity';
import {BaseInfoItemRepository} from './base-info-item.repository';
import {BaseInfoRepository} from '../base-info/base-info.repository';
import {BaseInfo} from '@/entities/base-info.entity';
import {BaseInfoItemController} from "@/domain/base-info-item/base-info-item.controller";

@Module({
    imports: [TypeOrmModule.forFeature([BaseInfoItem, BaseInfo])],
    controllers: [BaseInfoItemController],
    providers: [
        BaseInfoItemService,
        BaseInfoItemProfile,
        BaseInfoItemRepository,
        BaseInfoRepository,
    ],
    exports: [BaseInfoItemService, BaseInfoItemRepository],
})
export class BaseInfoItemModule {
}
