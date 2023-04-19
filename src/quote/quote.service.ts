import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { Quote } from './quote.entity';

@Injectable()
export class QuoteService {
    constructor(@Inject(PG_CONNECTION) private conn: any) {}
    async getQuotes() {
        const res = await this.conn.query( `SELECT 
            quote_id AS id, 
            quote_ticker AS ticker,
            quote_timestamp AS timestamp,
            quote_price AS price
        FROM quote`);
        return res.rows as Quote[];
    }
}
