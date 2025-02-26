import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {VolunteerInfo} from '@/entities/volunteer-info.entity';
import {VolunteerInfoRepository} from '@/domain/volunteer-info/volunteer-info.repository';
import {VolunteerInfoService} from '@/domain/volunteer-info/volunteer-info.service';
import {VolunteerInfoController} from "@/domain/volunteer-info/volunteer-info.controller";
import {VolunteerInfoProfile} from "@/domain/volunteer-info/volunteer-info.profile";
import { OauthClientModule } from '@/external-client/oauth-client/oauth-client.module';

@Module({
    imports: [TypeOrmModule.forFeature([VolunteerInfo]),OauthClientModule],
    controllers: [VolunteerInfoController],
    providers: [
        VolunteerInfoRepository,
        VolunteerInfoService,
        VolunteerInfoProfile
    ],
    exports: [
        VolunteerInfoRepository,
        VolunteerInfoService
    ],
})
export class VolunteerInfoModule {
}
