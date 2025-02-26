import { Test, TestingModule } from '@nestjs/testing';
import { BaseInfoController } from './base-info.controller';
import { BaseInfoService } from './base-info.service';

describe('BaseInfoController', () => {
  let controller: BaseInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaseInfoController],
      providers: [BaseInfoService],
    }).compile();

    controller = module.get<BaseInfoController>(BaseInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
