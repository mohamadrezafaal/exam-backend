import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganOperational } from "@/entities/organ-operational.entity";
import { OrganPost } from "@/entities/organ-post.entity";
import { Organ } from "@/entities/organ.entity";
import { TreeRepository } from "typeorm";
import { OrganOperationalRepository } from "../organ-operational/organ-operational.repository";
import { OrganPostRepository } from "../organ-post/organ-post.repository";
import { OrganController } from "./organ.controller";
import { OrganProfile } from "./organ.profile";
import { OrganRepository } from "./organ.repository";
import { OrganService } from "./organ.service";
import {OrganProperty} from "@/entities/organ-property.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Organ, OrganOperational, OrganPost,OrganProperty])],
    controllers: [OrganController],
    providers: [OrganService, OrganProfile, OrganRepository, OrganOperationalRepository, OrganPostRepository, TreeRepository],
    exports: [OrganRepository, OrganService],

})
export class OrganModule { }