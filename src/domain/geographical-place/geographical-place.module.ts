import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {GeographicalPlace} from '@/entities/geographical-place.entity';
import {GeographicalPlaceRepository} from './geographical-place.repository';
import {GeographicalPlaceService} from './geographical-place.service';
import {TreeRepository} from 'typeorm';
import {GeographicalPlaceProfile} from "@/domain/geographical-place/geographical-place.profile";

@Module({
    imports: [TypeOrmModule.forFeature([GeographicalPlace])],
    controllers: [],
    providers: [
        GeographicalPlaceService,
        GeographicalPlaceProfile,
        GeographicalPlaceRepository,
        TreeRepository,
    ],
    exports: [GeographicalPlaceRepository, GeographicalPlaceService],
})
export class GeographicalPlaceModule {
}
