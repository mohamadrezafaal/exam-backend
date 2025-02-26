import { Test, TestingModule } from '@nestjs/testing';
import { OauthClientService } from './oauth-client.service';

describe('OauthClientService', () => {
  let service: OauthClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OauthClientService],
    }).compile();

    service = module.get<OauthClientService>(OauthClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
