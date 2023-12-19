import { Test, TestingModule } from '@nestjs/testing';
import { AstralArchiveController } from './astral-archive.controller';

describe('AstralArchiveController', () => {
  let controller: AstralArchiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AstralArchiveController],
    }).compile();

    controller = module.get<AstralArchiveController>(AstralArchiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
