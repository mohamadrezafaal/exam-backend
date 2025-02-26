import { Test, TestingModule } from '@nestjs/testing';
import { OauthClientController } from './oauth-client.controller';

describe('OauthClientController', () => {
  let controller: OauthClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OauthClientController],
    }).compile();

    controller = module.get<OauthClientController>(OauthClientController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
