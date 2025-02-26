import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganProperty } from "@/entities/organ-property.entity";
import { OrganPropertyRepository } from "./organ-property.repository";
import { OrganPropertyController } from "./organ-property.controller";
import { OrganPropertyProfile } from "./organ-property.profile";
import { OrganPropertyService } from "./organ-property.service";

@Module({
    imports:[TypeOrmModule.forFeature([OrganProperty])],
    controllers:[OrganPropertyController],
    providers:[OrganPropertyService,OrganPropertyProfile,OrganPropertyRepository],
    exports:[OrganPropertyRepository,OrganPropertyService],
})
export class OrganPropertyModule { }
