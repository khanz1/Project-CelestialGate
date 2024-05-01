import { Test, TestingModule } from '@nestjs/testing';
import { GalacticPathController } from './galactic-path.controller';

describe('GalacticPathController', () => {
  let controller: GalacticPathController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GalacticPathController],
    }).compile();

    controller = module.get<GalacticPathController>(GalacticPathController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
