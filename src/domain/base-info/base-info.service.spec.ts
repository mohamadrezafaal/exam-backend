import { Test, TestingModule } from '@nestjs/testing';
import { BaseInfoService } from './base-info.service';

describe('BaseInfoService', () => {
  let service: BaseInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseInfoService],
    }).compile();

    service = module.get<BaseInfoService>(BaseInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
