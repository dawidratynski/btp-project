import { Injectable } from '@nestjs/common';
import { Quote } from './quote.entity';

@Injectable()
export class QuoteService {
    async findAll(): Promise<Quote[]> {
        const quote = new Quote();
        quote.id = 1;
        quote.price = 12.3;
        quote.ticker = "TSLA";
        quote.timestamp = new Date(Date.UTC(2022,10,12,3,12,32,0));

        return [quote]
    }
}
