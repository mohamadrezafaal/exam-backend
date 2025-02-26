import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { OrganPostRepository } from "./organ-post.repository";
import { OrganPost } from "@/entities/organ-post.entity";

@Injectable()
export class OrganPostService extends TypeOrmCrudService<OrganPost> {
  constructor(
    private readonly repository: OrganPostRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(repository);
  }
 }
