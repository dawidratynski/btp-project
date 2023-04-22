import { Test, TestingModule } from '@nestjs/testing';
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
    });


    describe('when getQuotes is called multiple times concurrently', () => {
      let elapsed_time: number;
      const sleep_time = 100;
      function sleep(time_in_ms: number) {
        return new Promise(resolve => setTimeout(resolve, time_in_ms));
      }
      const {performance} = require('perf_hooks');


      beforeEach(async () =>{
        service.getQuotes = (async () => {
          await sleep(sleep_time);
          return [quoteStub(), quoteStub(), quoteStub()];
        })

        let start_time = performance.now();
        const query1 = resolver.getQuotes();
        const query2 = resolver.getQuotes();
        const query3 = resolver.getQuotes();

        await query1;
        await query2;
        await query3;

        let end_time = performance.now();
        elapsed_time = end_time - start_time;
      })


      test('then it should run queries concurrently', () => {
        expect(elapsed_time).toBeLessThan(3 * sleep_time);
      })
    });
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
    });


    describe('when addQuote is called multiple times concurrently', () => {
      let elapsed_time: number;
      const sleep_time = 100;
      const {performance} = require('perf_hooks');
      function sleep(time_in_ms: number) {
        return new Promise(resolve => setTimeout(resolve, time_in_ms));
      }
      

      beforeEach(async () =>{
        service.addQuote = (async () => {
          await sleep(sleep_time);
          return quoteStub();
        })

        let start_time = performance.now();

        const query1 = resolver.addQuote(quoteStub());
        const query2 = resolver.addQuote(quoteStub());
        const query3 = resolver.addQuote(quoteStub());
        
        await query1;
        await query2;
        await query3;

        let end_time = performance.now();
        elapsed_time = end_time - start_time;
      })


      test('then it should run queries concurrently', () => {
        expect(elapsed_time).toBeLessThan(3 * sleep_time);
      })
    });
  });
});