import {Test, TestingModule} from '@nestjs/testing';

import {WorkflowService} from "./workflow.service";
import {HttpModule, HttpService} from "@nestjs/axios";
import { LoggerService } from "../../common/services/logger.service";
import { ConfigModule } from "@nestjs/config/dist/config.module";

describe('WorkflowService', () => {
  let service: WorkflowService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports:[HttpModule, ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: ['.development.env', '.env'],
      }),],
      providers: [WorkflowService,LoggerService],
    }).compile();

    service = module.get<WorkflowService>(WorkflowService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('getWorkflowState', async () => {
  // jest.spyOn(service,'getWorkflowState').mockReturnValue(1);

   const result = await service.getWorkflowState(1);
   expect(result).toEqual(2);


  });

});
