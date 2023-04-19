import { Resolver, Query } from '@nestjs/graphql';
import { Quote } from './quote.entity';
import { QuoteService } from './quote.service';

@Resolver(of => Quote)
export class QuoteResolver {
    constructor(private quoteService: QuoteService){}

    @Query(returns => [Quote])
    getQuotes(): Promise<Quote[]>{
        return this.quoteService.getQuotes();
    }
}
