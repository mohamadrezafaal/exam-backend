import { Module } from '@nestjs/common';
import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { CamelCaseNamingConvention } from '@automapper/core';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
      namingConventions: new CamelCaseNamingConvention(),
    }),
  ],
})
export class MapperModule {}
