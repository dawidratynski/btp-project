import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './../constants';
import { AddQuoteInput } from './dto/add-quote.input';
import { Quote } from './quote.entity';

@Injectable()
export class QuoteService {

    constructor(@Inject(PG_CONNECTION) public conn: any) {}

    async getQuotes():Promise<Quote[]> {
        const query_str = `SELECT * FROM quote`;
        try {
            const res = await this.conn.query(query_str);
            return res.rows as Quote[];
        } catch {
            throw new HttpException("Failed to connect to database", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async addQuote(addQuoteInput : AddQuoteInput):Promise<Quote>{
        const query_str = "INSERT INTO quote(ticker, timestamp, price) VALUES ( '" + 
                        addQuoteInput.ticker.toString() + "', '" + 
                        addQuoteInput.timestamp.toISOString() + "','" + 
                        addQuoteInput.price.toString() + "' ) RETURNING * ;";

        try{
            const newQuote = await this.conn.query(query_str);
            return (newQuote.rows as Quote[])[0]
        } catch {
            throw new HttpException("Failed to connect to database", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
