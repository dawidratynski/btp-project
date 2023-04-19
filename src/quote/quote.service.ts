import { Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from 'src/constants';
import { log } from 'util';
import { AddQuoteInput } from './dto/add-quote.input';
import { Quote } from './quote.entity';

@Injectable()
export class QuoteService {

    constructor(@Inject(PG_CONNECTION) private conn: any) {}

    async getQuotes() {
        const res = await this.conn.query( `SELECT * FROM quote`);
        return res.rows as Quote[];
    }

    async addQuote(addQuoteInput : AddQuoteInput):Promise<Quote>{
        const query_str = "INSERT INTO quote(ticker, timestamp, price) VALUES ( '" + 
                        addQuoteInput.ticker.toString() + "', '" + addQuoteInput.timestamp.toISOString() + "','" + 
                        addQuoteInput.price.toString() + "' ) RETURNING * ;";

        const newQuote = await this.conn.query(query_str);

        return (newQuote.rows as Quote[])[0];
    }
}
