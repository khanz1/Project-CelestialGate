import { Test, TestingModule } from '@nestjs/testing';
import { GalacticPathService } from './galactic-path.service';

describe('GalacticPathService', () => {
  let service: GalacticPathService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GalacticPathService],
    }).compile();

    service = module.get<GalacticPathService>(GalacticPathService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
