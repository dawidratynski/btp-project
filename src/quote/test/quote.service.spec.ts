import { Test, TestingModule } from '@nestjs/testing';
import { DbModule } from '../../db/db.module';
import { QuoteResolver } from '../quote.resolver';
import { QuoteService } from '../quote.service';

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteResolver, QuoteService],
      imports: [DbModule],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
