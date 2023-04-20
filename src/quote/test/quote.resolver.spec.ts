import { Test, TestingModule } from '@nestjs/testing';
import { resolve } from 'path/posix';
import { DbModule } from '../../db/db.module';
import { Quote } from '../quote.entity';
import { QuoteResolver } from '../quote.resolver';
import { QuoteService } from '../quote.service';
import { quoteStub } from './stubs/quote.stub';

jest.mock('./../quote.service.ts');

describe('QuoteResolver', () => {
  let resolver: QuoteResolver;
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteResolver, QuoteService],
      imports: [DbModule],
    }).compile();

    resolver = module.get<QuoteResolver>(QuoteResolver);
    service = module.get<QuoteService>(QuoteService);
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('getQuotes', () => {
    describe('when getQuotes is called', () => {
      let quotes: Quote[];
      let expectedQuotes: Quote[];

      beforeEach(async () =>{
        quotes = await resolver.getQuotes()
        expectedQuotes = await service.getQuotes()
      })

      test('then it should call QuoteService::getQuotes', () => {
        expect(service.getQuotes).toBeCalled();
      })

      test('then should return the same as service.getQuotes', () => {
        expect(quotes).toEqual(expectedQuotes);
      })
    })
  });

  describe('addQuote', () => {
    describe('when addQuote is called', () => {
      let returnQuote: Quote;
      let expectedReturnQuote: Quote;

      beforeEach(async () =>{
        returnQuote = await resolver.addQuote(quoteStub());
        expectedReturnQuote = await service.addQuote(quoteStub());
      })

      test('then it should call QuoteService::addQuote', () => {
        expect(service.addQuote).toBeCalled();
      })

      test('then should return the same as service.addQuote', () => {
        expect(returnQuote).toEqual(expectedReturnQuote);
      })
    })
  });
});
