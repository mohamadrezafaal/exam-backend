import { CreateExamDto } from '@/domain/exam/dto/create-exam.dto';
import { ReadExamDto } from '@/domain/exam/dto/read-exam.dto';
import { BaseInfoItem } from '@/entities/base-info-item.entity';
import { Exam } from '@/entities/exam.entity';
import { createMap, forMember, Mapper, mapWith } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { ReadBaseInfoItemDto } from '../base-info-item/dto/read-base-info-item.dto';
import { UpdateExamDto } from './dto/update-exam.dto';

@Injectable()
export class ExamProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, CreateExamDto, Exam);
      createMap(mapper, UpdateExamDto, Exam);
      createMap(mapper, ReadExamDto, Exam);
      createMap(
        mapper,
        Exam,
        ReadExamDto,
        forMember(
          (d) => d.examType,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.examType),
        ),
        forMember(
          (d) => d.examHold,
          mapWith(ReadBaseInfoItemDto, BaseInfoItem, (s) => s.examHold),
        ),
      );
    };
  }
}
