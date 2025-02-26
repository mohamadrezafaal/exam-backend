import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { GeographicalPlace } from '@/entities/geographical-place.entity';
import { GeographicalPlaceRepository } from './geographical-place.repository';

@Injectable()
export class GeographicalPlaceService extends TypeOrmCrudService<GeographicalPlace> {
  constructor(
    private readonly repository: GeographicalPlaceRepository,
    @InjectMapper() readonly mapper: Mapper,
  ) {
    super(repository);
  }
}