import { Test, TestingModule } from '@nestjs/testing';
import { DbModule } from '../../db/db.module';
import { QuoteService } from '../quote.service';
import { Quote } from '../quote.entity';
import { quoteStub } from './stubs/quote.stub';
import { HttpException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { addQuoteInputStub } from './stubs/add-quote.input.stub';
import { AddQuoteInput } from '../dto/add-quote.input';


describe('Postgresql queries from QuoteService (Assumes a working db connection!)', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService],
      imports: [DbModule, ConfigModule.forRoot()],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });


  describe('getQuotes', () => {
    describe('when getQuotes is called', () => {
      let quotes: Quote[];
      
      beforeEach(async () =>{
        quotes = await service.getQuotes();
      })

      test('then it should return an array of quotes', () => {
        expect(quotes.length).toBeGreaterThanOrEqual(0);
      })
    });


    describe('when getQuotes is called multiple times concurrently', () => {
      let single_request_elapsed_time: number;
      let elapsed_time: number;
      const {performance} = require('perf_hooks');
    
      beforeEach(async () =>{
        let start_time = performance.now();
        await service.getQuotes();
        let end_time = performance.now();
        single_request_elapsed_time = end_time - start_time;


        start_time = performance.now();
        const query1 = service.getQuotes();
        const query2 = service.getQuotes();
        const query3 = service.getQuotes();
        const query4 = service.getQuotes();
        const query5 = service.getQuotes();

        await query1;
        await query2;
        await query3;
        await query4;
        await query5;

        end_time = performance.now();
        elapsed_time = end_time - start_time;
      });


      test('then it should run queries concurrently', () => {
        expect(elapsed_time).toBeLessThan(5 * single_request_elapsed_time);
      });
    });
  });


  describe('addQuote', () => {
    describe('when addQuote is called', () => {
      let returnQuote: Quote;
      let inputQuote: AddQuoteInput;

      beforeEach(async () =>{
        inputQuote = addQuoteInputStub();
        returnQuote = await service.addQuote(inputQuote);
      });

      test('then it should return provided quote (except for id)', () => {
        expect(returnQuote.price).toEqual(inputQuote.price);
        expect(returnQuote.ticker).toEqual(inputQuote.ticker);
        expect(returnQuote.timestamp.toISOString()).toEqual(inputQuote.timestamp.toISOString());
      });
    });

    describe('when addQuote is called multiple times concurrently on the same new ticker', () => {
      const test_ticker_name = 'test_ticker_' + Math.random().toString(36).slice(2, 22); // this will generate pseudo-random 20 character alphanumeric string representing a ticker
      let elapsed_time: number;
      let single_request_elapsed_time: number;
      const {performance} = require('perf_hooks');

      let inputQuote: AddQuoteInput;
    
      beforeEach(async () =>{
        inputQuote = addQuoteInputStub();

        let start_time = performance.now();
        await service.addQuote(inputQuote);
        let end_time = performance.now();
        single_request_elapsed_time = end_time - start_time;

        inputQuote.ticker = test_ticker_name; // random ticker, most likely not in database

        start_time = performance.now();

        // Note: tickers are marked in db as unique, so trying to add duplicates of the same ticker would raise error

        const query1 = service.addQuote(inputQuote);
        const query2 = service.addQuote(inputQuote);
        const query3 = service.addQuote(inputQuote);
        const query4 = service.addQuote(inputQuote);
        const query5 = service.addQuote(inputQuote);

        await query1;
        await query2;
        await query3;
        await query4;
        await query5;

        end_time = performance.now();
        elapsed_time = end_time - start_time;
      });


      test('then it should run queries concurrently', () => {
        expect(elapsed_time).toBeLessThan(5 * single_request_elapsed_time);
      });
    });
  });
});
