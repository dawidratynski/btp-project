import { Test, TestingModule } from '@nestjs/testing';
import { DbModule } from '../../db/db.module';
import { QuoteService } from '../../quote/quote.service';
import { Pool } from 'pg'
import { ConfigModule } from '@nestjs/config';

describe('dbProvider (connection Pool)', () => {
  let service: QuoteService;
  let conn: Pool;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuoteService],
      imports: [DbModule, ConfigModule.forRoot()],
      
    }).compile();

    service = module.get<QuoteService>(QuoteService);
    conn = service.conn;
  });

  afterEach(async () => {
    await conn.end();
  })

  test('should be defined', () => {
    expect(conn).toBeDefined();
  });

  test('should have defined connection options', () => {
    expect(conn.options.user).toBeDefined();
  });

  test('should connect to database', () => {
    expect.assertions(1);
    expect(conn.query('SELECT 1;')).resolves.not.toThrow();
  })

  describe('when queries are called multiple times concurrently (assumes working db connection!)', () => {
    let elapsed_time: number;
    const sleep_time_in_seconds = 0.1;
    const {performance} = require('perf_hooks');
    const sleep_query = "SELECT pg_sleep(" + sleep_time_in_seconds.toString() + ");";

    beforeEach(async () =>{
      let start_time = performance.now();
      
      const query_result_1 = conn.query(sleep_query);
      const query_result_2 = conn.query(sleep_query);
      const query_result_3 = conn.query(sleep_query);
      await query_result_1;
      await query_result_2;
      await query_result_3;

      let end_time = performance.now();
      elapsed_time = end_time - start_time;
    })

    test('then it should run queries concurrently', () => {
      expect.assertions(1);
      expect(elapsed_time).toBeLessThan( 3 * sleep_time_in_seconds * 1000);
    })
  });
  
});
