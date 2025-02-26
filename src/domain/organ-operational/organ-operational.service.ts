import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { OrganOperational } from "@/entities/organ-operational.entity";
import { OrganOperationalRepository } from "./organ-operational.repository";

@Injectable()
export class OrganOperationalService extends TypeOrmCrudService<OrganOperational> {
  constructor(
    private readonly repository: OrganOperationalRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {
    super(repository);
  }

}
