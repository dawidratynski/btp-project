import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './../constants';
import { AddQuoteInput } from './dto/add-quote.input';
import { Quote } from './quote.entity';


@Injectable()
export class QuoteService {


    constructor(@Inject(PG_CONNECTION) public conn: any) {}


    async getQuotes():Promise<Quote[]> {
        const query_str = `SELECT quotes.id, ticker, timestamp, price FROM quotes INNER JOIN tickers ON quotes.ticker_id = tickers.id;`;
        try {
            const res = await this.conn.query(query_str);
            return res.rows as Quote[];
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async addQuote(addQuoteInput : AddQuoteInput):Promise<Quote>{
        const query_str = `
                WITH new_ticker AS (
                    INSERT INTO tickers (ticker) VALUES ($1)
                    RETURNING id, ticker
                )
                INSERT INTO quotes(ticker_id, timestamp, price) VALUES ((SELECT id FROM new_ticker), $2, $3) 
                RETURNING id, timestamp, price, (SELECT ticker FROM new_ticker);
        `
        const query_values = [addQuoteInput.ticker.toString(), addQuoteInput.timestamp.toISOString(), addQuoteInput.price.toString()];

        // TO DO: stop adding a duplicate ticker if one already exists
        // TO DO: solve race condition on adding a new ticker

        try{
            const newQuote = await this.conn.query(query_str, query_values);
            return (newQuote.rows as Quote[])[0];
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
