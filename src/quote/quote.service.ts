import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PG_CONNECTION } from './../constants';
import { AddQuoteInput } from './dto/add-quote.input';
import { Quote } from './quote.entity';


@Injectable()
export class QuoteService {


    constructor(@Inject(PG_CONNECTION) public conn: any) {}


    async getQuotes():Promise<Quote[]> {
        const query_str = `SELECT * FROM quotes`;
        try {
            const res = await this.conn.query(query_str);
            return res.rows as Quote[];
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async addQuote(addQuoteInput : AddQuoteInput):Promise<Quote>{
        const query_str = "INSERT INTO quotes(ticker, timestamp, price) VALUES ( $1, $2, $3 ) RETURNING *;"
        const query_values = [addQuoteInput.ticker.toString(), addQuoteInput.timestamp.toISOString(), addQuoteInput.price.toString()];

        // TO DO: change query to work with new database

        try{
            const newQuote = await this.conn.query(query_str, query_values);
            return (newQuote.rows as Quote[])[0];
        } catch (err) {
            throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
