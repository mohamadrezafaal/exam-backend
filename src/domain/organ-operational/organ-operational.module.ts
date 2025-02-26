import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganOperational } from "@/entities/organ-operational.entity";
import { OrganOperationalController } from "./organ-operational.controller";
import { OrganOperationalProfile } from "./organ-operational.profile";
import { OrganOperationalRepository } from "./organ-operational.repository";
import { OrganOperationalService } from "./organ-operational.service";

@Module({
    imports: [TypeOrmModule.forFeature([OrganOperational])],
    controllers: [OrganOperationalController],
    providers: [OrganOperationalService, OrganOperationalProfile, OrganOperationalRepository,],
    exports: [OrganOperationalRepository, OrganOperationalService],
})
export class OrganOperationalModule { }
