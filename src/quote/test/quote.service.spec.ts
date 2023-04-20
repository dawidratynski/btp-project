import { Test, TestingModule } from '@nestjs/testing';
import { DbModule } from '../../db/__mocks__/db.module';
import { QuoteService } from '../quote.service';
import { Quote } from '../quote.entity';
import { quoteStub } from './stubs/quote.stub';
import { HttpException, HttpStatus } from '@nestjs/common';


jest.mock('../../db/db.module.ts');

describe('QuoteService', () => {
  let service: QuoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService],
      imports: [DbModule],
    }).compile();

    service = module.get<QuoteService>(QuoteService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getQuotes', () => {
    describe('when getQuotes is called', () => {
      let quotes: Quote[];
      let expectedQuotes: Quote[];
      
      beforeEach(async () =>{
        quotes = await service.getQuotes();
        expectedQuotes = [ quoteStub(), quoteStub(), quoteStub() ];
      })

      test('then it should query injected dbProvider', () => {
        expect(service.conn.query).toBeCalled();
      })

      test('then it should return Quote[] returned by db', () => {
        expect(quotes).toEqual(expectedQuotes);
      })

      test('then it should throw HttpException if injected dbProvider throws', () => {
        service.conn.query = () => {throw new Error};
        expect(service.conn.query).toThrow();
      })
    });

    describe('when getQuotes is called but db throws', () => {
      let returnError: any;
      let expectedReturnError: any;
      let didThrow: boolean;

      beforeEach(async () =>{
        service.conn.query = () => {throw new Error};

        try{
          await service.getQuotes();
          didThrow = false;
        } catch (err) {
          didThrow = true;
          returnError = err;
        }
        
        expectedReturnError = new HttpException("Failed to connect to database", HttpStatus.INTERNAL_SERVER_ERROR);
      })

      test('then it should throw', () => {
        expect(didThrow).toEqual(true);
      })

      test('then thrown error should be correct', () => {
        expect(returnError).toEqual(expectedReturnError)
      })
    })
  });

  describe('addQuote', () => {
    describe('when addQuote is called and db anwsers correctly', () => {
      let returnQuote: Quote;
      let expectedReturnQuote: Quote;

      beforeEach(async () =>{
        returnQuote = await service.addQuote(quoteStub());
        expectedReturnQuote = quoteStub();
      })

      test('then it should query injected dbProvider', () => {
        expect(service.conn.query).toBeCalled();
      })

      test('then it should return Quote[] returned by db', () => {
        expect(returnQuote).toEqual(expectedReturnQuote);
      })
    });

    describe('when addQuote is called but db throws', () => {
      let returnError: any;
      let expectedReturnError: any;
      let didThrow: boolean;

      beforeEach(async () =>{
        service.conn.query = () => {throw new Error};

        try{
          await service.addQuote(quoteStub());
          didThrow = false;
        } catch (err) {
          didThrow = true;
          returnError = err;
        }
        
        expectedReturnError = new HttpException("Failed to connect to database", HttpStatus.INTERNAL_SERVER_ERROR);
      })

      test('then it should throw', () => {
        expect(didThrow).toEqual(true);
      })

      test('then thrown error should be correct', () => {
        expect(returnError).toEqual(expectedReturnError)
      })
    })
  });
});
