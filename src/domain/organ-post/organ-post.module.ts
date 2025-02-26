import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganPost } from '@/entities/organ-post.entity';
import { OrganPostController } from './organ-post.controller';
import { OrganPostProfile } from './organ-post.profile';
import { OrganPostService } from './organ-post.service';
import { Module } from '@nestjs/common';
import { OrganPostRepository } from './organ-post.repository';

@Module({
    imports:[TypeOrmModule.forFeature([OrganPost])],
    controllers:[OrganPostController],
    providers:[OrganPostService,OrganPostProfile,OrganPostRepository],
    exports:[OrganPostRepository,OrganPostService],
})
export class OrganPostModule { }
