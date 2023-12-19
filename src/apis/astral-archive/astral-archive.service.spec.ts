import { Test, TestingModule } from '@nestjs/testing';
import { AstralArchiveService } from './astral-archive.service';

describe('AstralArchiveService', () => {
  let service: AstralArchiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [AstralArchiveService],
    }).compile();

    service = module.get<AstralArchiveService>(AstralArchiveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
