import { applyDecorators, Type } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { CommandResultDto } from '../dto/result/command-result.dto';
import { QueryListResultDto } from '../dto/result/query-list-result.dto';
import { QueryResultDto } from '../dto/result/query-result.dto';

export const ApiCommandResponse = <T extends Type<unknown>>(data: T) =>
  applyDecorators(
    ApiExtraModels(CommandResultDto, data),
    ApiOkResponse({
      description: `The command result of ${data.name}`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(CommandResultDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(data) },
            },
          },
        ],
      },
    }),
  );

export const ApiQueryListResponse = <T extends Type<unknown>>(data: T) =>
  applyDecorators(
    ApiExtraModels(QueryListResultDto, data),
    ApiOkResponse({
      description: `The query list result of ${data.name}`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(QueryListResultDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(data) },
              },
            },
          },
        ],
      },
    }),
  );

export const ApiQueryResponse = <T extends Type<unknown>>(data: T) =>
  applyDecorators(
    ApiExtraModels(QueryResultDto, data),
    ApiOkResponse({
      description: `The query result of ${data.name}`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(QueryResultDto) },
          {
            properties: {
              data: { $ref: getSchemaPath(data) },
            },
          },
        ],
      },
    }),
  );
